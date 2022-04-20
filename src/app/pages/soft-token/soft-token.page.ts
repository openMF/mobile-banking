import { Component, OnInit } from '@angular/core';
import { TotpService } from '@services/totp/totp.service';
import { Storage } from '@ionic/storage';
import { HelpersService } from '@services/helpers/helpers.service';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

declare var Authenticator: any;
var CryptoJS = require("crypto-js");

@Component({
  selector: 'app-soft-token',
  templateUrl: './soft-token.page.html',
  styleUrls: ['./soft-token.page.scss'],
})
export class SoftTokenPage implements OnInit {

  key: string;

  seconds: number = 30;

  dynamicToken: string;

  interval: any;

  constructor(
    private totpService: TotpService,
    private storage: Storage,
    private helpersService: HelpersService,
    private alertController: AlertController,
    private translate: TranslateService,
    private router: Router
  ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.totpSignUp();
  }

  async startToken() {
    await this.timeout(750);
    this.dynamicToken = await this.refreshToken();
    this.interval = setInterval( async () => {
        this.seconds--;
        if (this.seconds === 0) {
          this.seconds = 30;
          this.dynamicToken = await this.refreshToken();
        }
    }, 1000 );

  }

  async timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async refreshToken() {
    return (await Authenticator.generateToken(this.key)).replace(/(\d{3})/g, '$1 ').trim();
  }

  async totpSignUp() {

    const usuario = await this.getCurrentUser();

    if (!usuario) {
      return;
    }

    this.helpersService.presentLoading();

    const totpSecret = await this.storage.get('totpSecret');

    if (totpSecret) {
      this.key = totpSecret;
      this.startToken();
      setTimeout( () => this.helpersService.hideLoading(), 250 );
      return;
    }

    this.totpService.signUp(usuario)
      .toPromise()
      .then( resp => {
        if (resp.secret) {
          return resp;
        } else {
          return this.totpService.signUp({...usuario, renew: true}).toPromise();
        }
      }).then( async resp => {
        this.storage.set('totpSecret', resp.secret);
        const code = await Authenticator.generateToken(resp.secret);
        this.key = resp.secret;
        return this.totpService.signupConfirmSecret({
          username: usuario.username,
          code
        }).toPromise();
      } ).then( resp => {
        if (resp) {
          this.startToken();
        } else {
          throw new Error('No se pudo confirmar el Token');
        }
      } )
      .catch( async error => {
        if (error.status === 504 || error.status === 0) {
          
        } else {
          await this.helpersService.showErrorMessage();
        }
        this.router.navigateByUrl('/login');
      })
      .finally( () => this.helpersService.hideLoading() );
   
  }

  ionViewWillLeave() {
    clearInterval(this.interval);
  }

  async getCurrentUser(): Promise<any> {

    try {

      const { pin } = (await this.presentAlertPrompt()) || { pin: null };

      if (!pin) {
        throw new Error('NO-PIN')
      }
      
      const password = CryptoJS.SHA256(pin).toString(CryptoJS.enc.Hex);
      const encryptedUser = await this.storage.get('user-hash');
      const bytes = CryptoJS.AES.decrypt(encryptedUser, password);
      var usuario = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
     
      return Promise.resolve({username: usuario.username, password: usuario.password});

    } catch(error) {
      
      if (error.message !== 'NO-PIN') {
        await this.helpersService.showErrorMessage("Contraseña incorrecta", "Por favor verifica tu contraseña e intenta de nuevo");
      } 

      this.router.navigateByUrl('/login');

      return Promise.resolve(null);
    }
    
  }

  presentAlertPrompt(): Promise<any> {

    return new Promise(async (resolve) => {

      const translate = await this.translate.get([
        'To continue',
        'Ingresa tu contraseña',
        'Contraseña requerida',
        'Escribe tu contraseña',
        'Cancel',
        'Accept'
      ]).toPromise();

      const alert = await this.alertController.create({
        header: translate['To continue'],
        subHeader: translate['Ingresa tu contraseña'],
        backdropDismiss: false,
        // message: translate[message],
        inputs: [
          {
            name: 'pin',
            id: 'pin',
            type: 'password',
            placeholder: translate['Escribe tu contraseña'],
          }
        ],
        buttons: [
          {
            text: translate['Cancel'],
            role: 'cancel',
            handler: () => resolve()
          }, {
            text: translate['Accept'],
            handler: (alertData) => {
              let pin: string = alertData.pin.trim();
              if (pin) {
                resolve({ pin });
                return;
              } else {
                (document.getElementById('pin') as any).value = '';
              }

              if (!document.getElementById('text-error')) {
                document.getElementById('pin')
                  .insertAdjacentHTML('afterend', `<span id="text-error" style="color: #EB445A">${translate['Contraseña requerida']}<span>`);
              }

              return false;

            }
          }
        ]
      });

      alert.present().then( () => {
        document.getElementById('pin').setAttribute('maxlength', '8');
      } );
    })


  }

}
