import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import * as CustomValidators from '@globals/custom.validator';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import { ClientsService } from '@services/clients/clients.service';
import { AuthenticationService } from '@services/user/authentication.service';
import { HelpersService } from '@services/helpers/helpers.service';
import { TranslateService } from '@ngx-translate/core';


declare var faceapi;

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    allowEdit: true,
    targetWidth: 350,
    targetHeight: 350,
    correctOrientation: true,
    cameraDirection: this.camera.Direction.FRONT
  };;

  selectedFaceDetector = 'ssd_mobilenetv1'

  minConfidence: number = 0.9;

  facesDetected: number = null;

  imageUrl: string;

  registerForm: FormGroup;

  completeForm: any;

  loading: any;

  waiting: boolean = false;

  registerResponse: any;

  acceptTermsConditions: boolean = false;

  canRecognizeFace: boolean = false;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    public menuCtrl: MenuController,
    private alertController: AlertController,
    private camera: Camera,
    private storage: Storage,
    private clientsService: ClientsService,
    private toastController: ToastController,
    private authenticationService: AuthenticationService,
    public loadingController: LoadingController,
    public helpersService: HelpersService,
    private translate: TranslateService,
    private activatedRoute: ActivatedRoute
  ) {
    this.registerForm = formBuilder.group({
      uniqueId: ["", Validators.compose([
        Validators.required,
        Validators.maxLength(18),
        CustomValidators.ValidateCurp
      ])],
      dateOfBirth: ["", Validators.required],
      dateFormat: "yyyy-MM-dd",
      locale: "es",
      authenticationMode: "email",
      mobileNumber: ["", Validators.compose([
        Validators.required,
        CustomValidators.ValidatePhoneNumber
      ])],
    });

  }

  ngOnInit() {
    this.start();
  }

  ionViewWillEnter() {
    const { accept } = this.activatedRoute.snapshot.queryParams;
    this.acceptTermsConditions = !!accept;
  }

  async start() {
    const curp = this.registerForm.get('uniqueId');
    curp.valueChanges.subscribe(value => curp.setValue(value.toUpperCase(), { emitEvent: false }));

    const deviceMemory = (navigator as any).deviceMemory;
    
    if (deviceMemory && deviceMemory >= 1) {
      await faceapi.nets.ssdMobilenetv1.load(await faceapi.fetchNetWeights('/assets/models/ssd_mobilenetv1.weights'));
      this.canRecognizeFace = true;
    }
    
    // this.imageUrl = localStorage.getItem('image');

    // setTimeout(() => this.updateResults(), 100);
  }

  getFaceDetectorOptions() {
    return new faceapi.SsdMobilenetv1Options({ minConfidence: this.minConfidence })
  }

  async updateResults() {

    const inputImgEl = document.getElementById('img-user');
    const options = this.getFaceDetectorOptions();

    const results = await faceapi.detectAllFaces(inputImgEl, options);

    this.facesDetected = results.length;

    console.log(this.facesDetected);


    // const canvas = document.getElementById('overlay');
    // faceapi.matchDimensions(canvas, inputImgEl);
    // faceapi.draw.drawDetections(canvas, faceapi.resizeResults(results, inputImgEl));
  }

  getCurrentFaceDetectionNet() {
    return faceapi.nets.ssdMobilenetv1;
  }

  takePhoto(): void {
    this.camera.getPicture(this.options).then((imageData) => {

      if (imageData) {
        this.imageUrl = 'data:image/jpeg;base64,' + imageData;
      } else {
        throw new Error('No se capturo foto');
      }

      if (this.canRecognizeFace) {
        this.facesDetected = -1;
        setTimeout(() => this.updateResults(), 200);
      }
      
    }, (err) => {
      this.imageUrl = null;
      this.facesDetected = null;
    });
  }

  getActivationCode(): Promise<any> {
    //TODO: falta validar la CURP con RENAPO
    const form = { ...this.registerForm.value };
    delete form.curp;

    return this.storage.get('registration').then(value => {

      this.completeForm = {
        ...form,
        ...value,
        firstName: value.firstName.trim(),
        surName: value.surName.trim(),
        lastName: value.lastName.trim(),
        email: value.email.trim(),
        shaded: true,
        channel: "Movil",
        username: form.mobileNumber
      };

      return this.clientsService.postRegistration(this.completeForm)
        .toPromise().then(registerResponse => {
          this.registerResponse = registerResponse;
          return registerResponse;
        });

    }).catch(async error => {
      
      if (error.error && error.error.userMessageGlobalisationCode === 'error.msg.resource.not.found') {
        if (
          error.error.errors.length && 
          error.error.errors[0].userMessageGlobalisationCode === 'error.msg.user.email.is.in.use'
        ) {
          await this.helpersService.showErrorMessage(
            'Email already exists', 
            'Please try to register with a different email'
          );
        } else if (
          error.error.errors.length && 
          error.error.errors[0].userMessageGlobalisationCode === 'error.msg.service.is.not.enable.for.client'
        ) {
          await this.helpersService.showErrorMessage(
            'E-banking Disabled', 
            'Please go to your nearest branch and contract the E-banking service'
          );
        } else {
          const text = await this.translate.get('Customer details are incorrect, please contact support area').toPromise();
          this.presentToast(text); 
        }
      }

      throw error;
    });
  }


  register() {
    console.log("hacer peticion de registro");

    this.waiting = true;

    this.helpersService.presentLoading();

    this.getActivationCode().then(resp => {
      console.log('getActivationCode', resp);
      return Promise.all([this.presentAlertPrompt(), resp]);
    }).then(([token, resource]) => {
      console.log(token, resource);

      this.helpersService.presentLoading();

      if (token.codigoActivacion) {
        console.log('Its enter here');

        return this.clientsService.postConfirmRegistration({
          requestId: this.registerResponse.resourceId,
          authenticationToken: token.codigoActivacion
        }).toPromise().catch( async error => {
          if (error.error && error.error.userMessageGlobalisationCode === 'error.msg.resource.not.found') {
            this.helpersService.hideLoading();

            await this.helpersService.showErrorMessage(
              'Incorrect activation code', 
              'Try to register again, please enter the activation code correctly'
            );
          } 
          throw error; 
        } );
      }
      throw new Error('No se pudo obtener el código de activación');
    }).then((resp: any) => {
      console.log('confirm', resp);

      if (resp.resourceId) {
        return resp.resourceId;
      }
      throw new Error('No se pudo registrar el usuario');
    }).then(() => {
      const { username, password } = this.completeForm;
      this.authenticationService.simpleLogin({ username, password })
        .toPromise()
        .then(async (user: any) => {
          if (user.clientId) {

            // const text = await this.translate.get('User successfully registered').toPromise();
            // this.presentToast(text);

            await this.helpersService.showSuccessMessage(
              'User successfully registered', 
              'You can now login with your username (phone number) and password'
            );

            const file = this.dataURLtoFile(this.imageUrl);

            const formData = new FormData();
            formData.append('file', file);

            return this.clientsService.postRegistrationSelfie(user.clientId, formData, user.base64EncodedAuthenticationKey)
              .toPromise();
          }
          throw new Error('No se pudo registrar la selfie');
        })
    }).then(() => {
      this.helpersService.hideLoading();
      this.storage.set('image-profile', this.imageUrl);
      this.storage.remove('registration');
      this.router.navigateByUrl('/login');
    }).catch(async error => {
      console.error(error.error.userMessageGlobalisationCode);
      this.helpersService.hideLoading();
      
      if (error.error && error.error.userMessageGlobalisationCode === 'error.msg.user.duplicate.username') {
        this.helpersService.hideLoading();

        await this.helpersService.showErrorMessage(
          'Phone number already exists', 
          'Please try to register with a different phone number'
        );

      } else if (error.status === 504 || error.status === 0) {
        
      } else if (!error.error || error.error.userMessageGlobalisationCode !== 'error.msg.resource.not.found') {
        const text = await this.translate.get('Could not register user, please try again later').toPromise();
        this.presentToast(text);
      } 
    }).finally(() => {
      this.waiting = false;
    });
    //this.router.navigateByUrl('/dashboard'); //second-login

  }

  toOnlyRegex(key: string, regex: string) {
    const inputName = this.registerForm.get(key);
    inputName.valueChanges.subscribe(value => inputName.setValue( value.toUpperCase().replace(new RegExp(regex, 'g'), ""), { emitEvent: false }));
  }

  dataURLtoFile(dataurl, filename = 'image-profile.jpg') {

    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  presentAlertPrompt(): Promise<any> {

    this.helpersService.hideLoading();

    return new Promise(async (resolve, reject) => {

      const message = 'To complete the registration, check your email, an activation code must have arrived (if the code does not arrive, select the forward option) that you must provide below.';

      const translate = await this.translate.get([
        'Just one more step',
        'Check your email!',
        'Transfer amount greather than account balance',
        message,
        'Finish',
        'Activation code',
        'Activation code is required',
        'Resend',
        'Cancel',
        'Accept'
      ]).toPromise();

      const alert = await this.alertController.create({
        header: translate['Just one more step'],
        subHeader: translate['Check your email!'],
        backdropDismiss: false,
        message: translate[message],
        inputs: [
          {
            name: 'codigoActivacion',
            id: 'codigoActivacion',
            type: 'text',
            placeholder: translate['Activation code']
          }
        ],
        buttons: [
          {
            text: translate['Cancel'],
            role: 'cancel',
            handler: () => reject('cancelar')
          }, {
            text: translate['Resend'],
            handler: () => {
              this.getActivationCode();
              return false;
            }
          }, {
            text: translate['Accept'],
            handler: (alertData) => {
              let codigoActivacion: string = alertData.codigoActivacion.trim();
              if (codigoActivacion) {

                if (codigoActivacion.length === 11) {
                  codigoActivacion = codigoActivacion.substring(7, 11);
                }

                resolve({ codigoActivacion });
                return;
              } else {
                (document.getElementById('codigoActivacion') as any).value = '';
              }

              if (!document.getElementById('text-error')) {
                document.getElementById('codigoActivacion')
                  .insertAdjacentHTML('afterend', `<span id="text-error" style="color: #EB445A">${translate['Activation code is required']}<span>`);
              }

              return false;

            }
          }
        ]
      });

      alert.present().then( () => {
        document.getElementById('codigoActivacion').setAttribute('maxlength', '15');
      } );
    })


  }

  presentToast(message): boolean {
    this.toastController.create({
      message,
      duration: 5000
    }).then(toastData => {
      toastData.present();
    });

    return false;

  }
}
