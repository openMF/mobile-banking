import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import * as CustomValidators from '@globals/custom.validator';
import { HelpersService } from '@services/helpers/helpers.service';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '@services/user/user.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  forgotForm: FormGroup;

  constructor(public alertController: AlertController, 
              private router:Router, 
              public formBuilder: FormBuilder, 
              public menuCtrl: MenuController,
              private helpersService: HelpersService,
              private translate: TranslateService,
              private userService: UserService,
              private toastController: ToastController
            ) {

    this.forgotForm = formBuilder.group({
      channel: ["Movil"],
      curp: ["", Validators.compose([
        Validators.required,
        CustomValidators.ValidateCurp
      ])],
      email: ["", Validators.compose([
        Validators.required,
        CustomValidators.ValidateEmail
      ])]
  });

  }

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.menuCtrl.swipeGesture(false);
  }

  forgot(){
    console.log("enviar email de recuperacion")
    this.router.navigateByUrl('/home');
  }

  getActivationCode(presentAlert: boolean = true) {

    this.helpersService.presentLoading();
    this.userService.recoverPassword(this.forgotForm.value, 'request').toPromise().then( resp => {
      return (presentAlert ? this.presentAlertPrompt() : Promise.resolve() ).then( resp => {
        // const { codigoActivacion } = resp;
        if (presentAlert && resp !== 'cancelar') this.router.navigate([ '/forgot-password', 'renew-password' ]);
      } );
    } ).catch( async error => {

      if (error.status === 504 || error.status === 0) {
        
      } else {
        await this.helpersService.showErrorMessage(
          'Incorrect data', 
          'We did not find any user with the data provided'
        );
      } 
      
    } ) .finally( () => this.helpersService.hideLoading() );

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

  presentAlertPrompt(): Promise<any> {

    this.helpersService.hideLoading();
    
    return new Promise( async resolve => {

      const message = 'You should have received an activation code (if the code did not reach you, select the forward option) that you must provide below.';
      
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
        'Continue'
      ]).toPromise();

      const alert = await this.alertController.create({
        header: translate['Just one more step'],
        subHeader: translate['Check your email!'],
        backdropDismiss: false,
        message: translate[message],
        // inputs: [
        //   {
        //     name: 'codigoActivacion',
        //     id: 'codigoActivacion',
        //     type: 'text',
        //     placeholder: translate['Activation code']
        //   }
        // ],
        buttons: [
          {
            text: translate['Cancel'],
            role: 'cancel',
            handler: () => resolve('cancelar')
          }, {
            text: translate['Resend'],
            handler: () => {
              this.getActivationCode(false);
              return false;
            }
          }, {
            text: translate['Continue'],
            handler: (alertData) => {
              resolve();
              return;
              if (alertData.codigoActivacion) {
                console.log('se resuelve la promesa');
                
                resolve({codigoActivacion: alertData.codigoActivacion});
                return; 
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
        document.getElementById('codigoActivacion').setAttribute('maxlength', '10');
      } );
    } )

   
  }

  toOnlyRegex(key: string, regex: string) {
    const inputName = this.forgotForm.get(key);
    inputName.valueChanges.subscribe(value => inputName.setValue( value.toUpperCase().replace(new RegExp(regex, 'g'), ""), { emitEvent: false }));
  }

}
