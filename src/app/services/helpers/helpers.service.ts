import { Injectable } from '@angular/core';
import { LoadingController, AlertController, NavController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { formatDate } from '@angular/common';
import { environment } from '@env';
import { Storage } from '@ionic/storage';
import { UserService } from '@services/user/user.service';
const CryptoJS = require('crypto-js');


@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  flagNoInternetOpen = false;

  isLoading = false;

  constructor(
    protected loadingController: LoadingController,
    protected translate: TranslateService,
    protected alertController: AlertController,
    private navCtrl: NavController,
    private storage: Storage,
    private userService: UserService,
    private platform: Platform
  ) { }

  async presentLoading(text?: string) {
    // console.log("Presenting loading...")
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    const message = text ? text : 'Please wait...';
    this.translate.get(message).subscribe(async message => {

      return await this.loadingController.create({ message
        // duration: 5000,
      }).then(a => {
        a.present().then(() => {
          // console.log('presented');
          if (!this.isLoading) {
            a.dismiss().then(() => console.log('abort presenting'));
          }
        });
      });
    //   this.loading = await this.loadingController.create({ message });
    //   this.loading.present();
    //   console.log("Loading exists present:", this.loading);
    });
  }

  // async hideLoading() {
  //   this.isLoading = false;
  //   return await this.loadingController.dismiss().then(() => {}//console.log('dismissed'
  //   );
  // }

  public async hideLoading(): Promise<any> {
    if (!this.isLoading) {
      return;
    }
    this.isLoading = false;
    return new Promise(resolve => {
      setTimeout(() => this.loadingController.dismiss().then(() => resolve()), 300);
    });
  }

  public async showAlert(header: string, message: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.translate.get(['Cancel', 'Accept'])
        .subscribe(async (resp: any) => {
          const alert = await this.alertController.create({
            header,
            message,
            buttons: [
              {
                text: resp.Cancel,
                handler: () => reject('Cancel')
              },
              {
                text: resp.Accept,
                handler: () => resolve('Accept')
              }
            ]
          });
          await alert.present();
        });
    });
  }

  public async showNoInternet() {
    if (this.flagNoInternetOpen) {
      return;
    }
    this.flagNoInternetOpen = true;
    this.translate.get(['Accept']).subscribe(async translate => {
      const alert = await this.alertController.create({
        cssClass: 'no-internet-class',
        backdropDismiss: false,
        buttons: translate.Accept
      }).then(async (data) => {
        console.log(data);
        const wrapper: any = document.querySelector('.alert-wrapper');
        wrapper.innerHTML = '';
        wrapper.style.borderRadius = '20px';
        wrapper.style.position = 'relative';
        const text = await this.translate.get('Close').toPromise();
        wrapper.insertAdjacentHTML('afterbegin', `
        <img style="width: 100%; height: auto;" src="./assets/sin-internet.png" alt="Sin internet">
        <ion-text style="position: absolute; top: 13%; left: 14%; width: 72%; text-transform: uppercase; text-align: center; font-weight: bold">
          ${ await this.translate.get('No internet connection').toPromise() }
        </ion-text>
        <ion-text style="position: absolute; top: 62%; left: 14%; width: 72%; text-align: center; font-weight: bold; font-size: 13px">
          ${ await this.translate.get('Can not proccess the request right now. Try again later').toPromise() }
        </ion-text>
        <ion-button expand="block" id="btnClose" color="primary" style="position: absolute; top: 77%; left: 14%; width: 72%; text-transform: uppercase;">${text}</ion-button>
      `);
        document.querySelector('#btnClose').addEventListener('click', () => alert.dismiss());
        return data;
      });
      alert.onDidDismiss().then(() => this.flagNoInternetOpen = false);
      await alert.present();
    });
  }

  public async showSuccessMessage(header: string, message: string, routerLink?: string): Promise<any> {
    return this.translate.get([header, message, 'Accept']).toPromise().then(async translate => {
      const alert = await this.alertController.create({
        header: translate[header],
        message: translate[message],
        buttons: [
          {
            text: translate.Accept,
            handler: () => {
              if (routerLink) { this.navCtrl.navigateRoot([routerLink]); }
            }
          }
        ]
      });
      return await alert.present();
    });
  }

  public successMessage(header: string, message: string, routerLink?: string): Promise<any> {
    return this.translate.get([header, message, 'Accept']).toPromise().then(translate => {
      return this.alertController.create({
        header: translate[header],
        message: translate[message],
        buttons: [
          {
            text: translate.Accept,
            handler: () => {
              if (routerLink) {this.navCtrl.navigateRoot([routerLink]);}
            }
          }
        ]
      });
    });
  }

  public blockYourAccountMessage(next?: any): Promise<any> {
    return this.translate.get(['Accept']).toPromise().then(async translate => {
      const alert = await this.alertController.create({
        cssClass: 'blockYourAccountMessage',
      });
      
      const wrapper = document.querySelector('.blockYourAccountMessage .alert-wrapper');
      wrapper.insertAdjacentHTML('afterbegin', `
        
        <div class="alert-head ${this.getOSClass()}">
            <h2 id="alert-1-hdr" style="font-size: 18px;" class="alert-title ${this.getOSClass()}"> ${await this.translate.get('Inicio de sesión bloqueado').toPromise()}</h2>
        </div>

        <img
          style="width: 50px; height: auto; margin: auto; margin-bottom: -0.7rem"
          src="./assets/header-icons/candadoAbierto.png"
          alt="UnBlock">

        <div class="alert-head ${this.getOSClass()}">
          <h2 id="alert-1-sub-hdr" style="text-align: center; font-size: 14px;" class="alert-sub-title ${this.getOSClass()}">${await this.translate.get('¡Recuperar!').toPromise()}</h2>
        </div>

        <div id="alert-1-msg" style="text-align: justify !important; font-size: 14px;" class="alert-message ${this.getOSClass()}">
          ${ await this.translate.get('Has bloqueado tu banca móvil por 3 intentos fallidos de inicio de sesión, para desbloquear tu cuenta oprime el boton de DESBLOQUEAR y sigue los pasos del proceso de desbloqueo de tu cuenta').toPromise()}
        </div>

    

        <div class="alert-button-group alert-button-group-vertical ${this.getOSClass()}">
          <ion-button
            expand="block"
            id="btnNext"
            color="primary"
            style="width: 80%; margin: auto; margin-bottom: 0.8rem; text-transform: uppercase;"
          >
            ${await this.translate.get('DESBLOQUEAR').toPromise()}
          </ion-button>
          <ion-button
            expand="block"
            id="btnClose"
            color="medium"
            style="width: 80%; margin: auto; text-transform: uppercase;"
          >
            ${ await this.translate.get('CANCELAR').toPromise()}
          </ion-button>
        </div>
             
        
      `);
      await alert.present();
      document.querySelector('#btnNext').addEventListener('click', () => alert.dismiss());
      document.querySelector('#btnNext').addEventListener('click',()=> this.navCtrl.navigateRoot(['/login/get-email']));
      document.querySelector('#btnClose').addEventListener('click', () => alert.dismiss());
    });
  }

  public sendUnblockMailMessage(next?: any): Promise<any> {
    return this.translate.get(['Accept']).toPromise().then(async translate => {
      const alert = await this.alertController.create({
        cssClass: 'sendUnblockMailMessage',
      });
      const wrapper = document.querySelector('.sendUnblockMailMessage .alert-wrapper');
      wrapper.insertAdjacentHTML('afterbegin', `
        <img
          style="width: 100%; height: auto;"
          src="./assets/unblockMail.png"
          alt="unblockMail"
        >
        <ion-text
          style="position: absolute; top: 7%; left: 8%; width: 85%; text-transform: uppercase; text-align: center; font-weight: bold"
        >
          ${ await this.translate.get('Desbloquear Cuenta').toPromise()}
        </ion-text>
        <ion-text
          style="position: absolute; top: 32%; left: 14%; width: 72%; text-transform: uppercase; text-align: center; font-weight: bold"
        >
          ${ await this.translate.get('¡Ingresa tus datos!').toPromise()}
        </ion-text>
        <ion-text
          style="position: absolute; top: 42%; left: 10%; width: 80%; font-size: 95%; text-align: center; text-align: justify;"
        >
          ${ await this.translate.get('Para continuar con el proceso de desbloqueo...').toPromise()}
        </ion-text>
        <ion-item style="--background: rgba(205, 205, 205, 0); position: absolute; top: 50%;">
          <ion-input type="text" placeholder="Escribe tu CURP">
            ${ await this.translate.get('<ion-icon name="newspaper-outline"></ion-icon>').toPromise()}
          </ion-input>
        </ion-item>
        <ion-item style="--background: rgba(205, 205, 205, 0); position: absolute; top: 60%;">
          <ion-icon name="mail-outline"></ion-icon>
          <ion-input type="text" placeholder="Escribe tu correo"></ion-input>
        </ion-item>
        <ion-button
          expand="block"
          id="btnNext"
          color="primary"
          style="position: absolute; top: 73%; left: 14%; width: 72%; text-transform: uppercase;"
        >
          ${ await this.translate.get('VALIDAR').toPromise()}
        </ion-button>
        <ion-button
          expand="block"
          id="btnClose"
          color="medium"
          style="position: absolute; top: 85%; left: 14%; width: 72%; text-transform: uppercase;"
        >
          ${ await this.translate.get('CANCELAR').toPromise()}
        </ion-button>
      `);
      await alert.present();
      document.querySelector('#btnNext').addEventListener('click', () => alert.dismiss());
      document.querySelector('#btnNext').addEventListener('click', next[0]);
      document.querySelector('#btnClose').addEventListener('click', () => alert.dismiss());
    });
  }

  public getCodeMailMessage(next?: any): Promise<any> {
    return this.translate.get(['Accept']).toPromise().then(async translate => {
      const alert = await this.alertController.create({
        cssClass: 'getCodeMailMessage',
      });
      await alert.present();
      const wrapper = document.querySelector('.getCodeMailMessage .alert-wrapper');
      wrapper.insertAdjacentHTML('afterbegin', `
        <img
          style="width: 100%; height: auto;"
          src="./assets/unblockMail.png"
          alt="unblockMail"
        >
        <ion-text
          style="position: absolute; top: 7%; left: 8%; width: 85%; text-transform: uppercase; text-align: center; font-weight: bold"
        >
          ${ await this.translate.get('Sólo un paso más').toPromise()}
        </ion-text>
        <ion-text
          style="position: absolute; top: 29%; left: 14%; width: 72%; text-transform: uppercase; text-align: center; font-weight: bold"
        >
          ${ await this.translate.get('¡Revisa tu correo!').toPromise()}
        </ion-text>
        <ion-text
          style="position: absolute; top: 34%; left: 10%; width: 80%; font-size: 95%; text-align: center; text-align: justify;"
        >
          ${ await this.translate.get('Para finalizar el proceso de desbloqueo, revisa tu correo, te deberá llegar un código de desbloqueo que deberás proporcionar a continuación').toPromise()}
        </ion-text>
          <ion-item style="--background: rgba(205, 205, 205, 0); position: absolute; top: 50%;">
            <ion-input type="text" placeholder="Escribe tu código">
              ${ await this.translate.get('<ion-icon name="document-outline"></ion-icon>').toPromise()}
            </ion-input>
          </ion-item>
          <ion-item style="--background: rgba(205, 205, 205, 0); position: absolute; top: 60%;">
            <ion-input type="text" placeholder="Escribe tu contraseña">
              ${ await this.translate.get('<ion-icon name="lock-closed-outline"></ion-icon>').toPromise()}
            </ion-input>
          </ion-item>
          <ion-item style="--background: rgba(205, 205, 205, 0); position: absolute; top: 70%;">
            <ion-input type="text" placeholder="Confirma tu contraseña">
              ${ await this.translate.get('<ion-icon name="lock-closed-outline"></ion-icon>').toPromise()}
            </ion-input>
          </ion-item>
        <ion-button expand="block"
          id="btnNext"
          color="primary"
          style="position: absolute; top: 80%; left: 14%; width: 72%; text-transform: uppercase;"
        >
          ${ await this.translate.get('ACEPTAR').toPromise()}
        </ion-button>
        <ion-button 
          expand="block"
          id="btnClose"
          color="medium"
          style="position: absolute; top: 90%; left: 14%; width: 72%; text-transform: uppercase;"
        >
          ${ await this.translate.get('CANCELAR').toPromise()}
        </ion-button>
      `);
      document.querySelector('#btnNext').addEventListener('click', () => alert.dismiss());
      document.querySelector('#btnNext').addEventListener('click', next[0]);
      document.querySelector('#btnClose').addEventListener('click', () => alert.dismiss());
    });
  }

  public unblockSuccessMessage(next?: any): Promise<any> {
    return this.translate.get(['Accept']).toPromise().then(async translate => {
      const alert = await this.alertController.create({
        backdropDismiss: false,
        cssClass: 'unblockSuccessMessage',
      });
      
      const wrapper = document.querySelector('.unblockSuccessMessage .alert-wrapper');
      wrapper.insertAdjacentHTML('afterbegin', `
        
      <div class="alert-head ${this.getOSClass()}">
          <h2 id="alert-1-hdr" style="font-size: 18px;" class="alert-title ${this.getOSClass()}"> ${await this.translate.get('Desbloqueo Exitoso').toPromise()}</h2>
      </div>

      <img
        style="width: 50px; height: auto; margin: auto; margin-bottom: -0.7rem"
        src="./assets/header-icons/candadoAbierto.png"
        alt="UnBlock">

      <div class="alert-head ${this.getOSClass()}">
        <h2 id="alert-1-sub-hdr" style="text-align: center; font-size: 14px;" class="alert-sub-title ${this.getOSClass()}">${await this.translate.get('¡Ya puedes ingresar!').toPromise()}</h2>
      </div>

      <div id="alert-1-msg" style="text-align: justify !important; font-size: 14px;" class="alert-message ${this.getOSClass()}">
        ${ await this.translate.get('El proceso de desbloqueo de tu cuenta se completó exitosamente, ya puedes ingresar a tu Banca Móvil con tu usuario y contraseña').toPromise()}
      </div>


      <div class="alert-button-group alert-button-group-vertical ${this.getOSClass()}">
        <ion-button
          expand="block"
          id="btnNext"
          color="primary"
          style="width: 80%; margin: auto; margin-bottom: 0.8rem; text-transform: uppercase;"
        >
          ${await this.translate.get('ACEPTAR').toPromise()}
        </ion-button>
      </div>
    `);
      await alert.present();
      document.querySelector('#btnNext').addEventListener('click', () => alert.dismiss());
    });
  }

  public unlockDinamicKeyMessage(next?: any): Promise<any> {
    return this.translate.get(['Accept']).toPromise().then(async translate => {
      const alert = await this.alertController.create({
        backdropDismiss: false,
        cssClass: 'unlockDinamicKeyMessage',
      });
      
      const wrapper = document.querySelector('.unlockDinamicKeyMessage .alert-wrapper');
      wrapper.insertAdjacentHTML('afterbegin', `
        
        <div class="alert-head ${this.getOSClass()}">
            <h2 id="alert-1-hdr" style="font-size: 18px;" class="alert-title ${this.getOSClass()}"> ${await this.translate.get('Clave Dinámica Bloqueada').toPromise()}</h2>
        </div>

        <img
          style="width: 50px; height: auto; margin: auto; margin-bottom: -0.7rem"
          src="./assets/header-icons/candadoAbierto.png"
          alt="UnBlock">

        <div class="alert-head ${this.getOSClass()}">
          <h2 id="alert-1-sub-hdr" style="text-align: center; font-size: 14px;" class="alert-sub-title ${this.getOSClass()}">${await this.translate.get('DESBLOQUEAR').toPromise()}</h2>
        </div>

        <div id="alert-1-msg" style="text-align: justify !important; font-size: 14px;" class="alert-message ${this.getOSClass()}">
          ${ await this.translate.get('Has bloqueado tu Clave Dinámica por 5 intentos fallidos de uso en tu Banca por Internet, para desbloquear tu Clave Dinámica escribe tu Contraseña y oprime el botón de <b> DESBLOQUEAR </b> y sigue los pasos de desbloqueo').toPromise()}
        </div>

        <div style="margin-top: -1.5rem" class="alert-input-group ${this.getOSClass()}" aria-labelledby="alert-1-hdr">
            <div class="alert-input-wrapper ${this.getOSClass()}">
                <input id="pin" type="password" maxlength="8" placeholder="Escribe tu Contraseña" tabindex="0" class="alert-input ${this.getOSClass()}">
            </div>
            <ion-text
            id="text-error"
              style="width: 85%; text-align: center; color: #EB445A; display: none;"
            >
              ${await this.translate.get('La contraseña es requerida').toPromise()}
            </ion-text>
        </div>

        <div class="alert-button-group alert-button-group-vertical ${this.getOSClass()}">
          <ion-button
            expand="block"
            id="btnNext"
            color="primary"
            style="width: 80%; margin: auto; margin-bottom: 0.8rem; text-transform: uppercase;"
          >
            ${await this.translate.get('DESBLOQUEAR').toPromise()}
          </ion-button>
          <ion-button
            expand="block"
            id="btnClose"
            color="medium"
            style="width: 80%; margin: auto; text-transform: uppercase;"
          >
            ${ await this.translate.get('CANCELAR').toPromise()}
          </ion-button>
        </div>     
        
      `);
      await alert.present();
      document.querySelector('#btnNext').addEventListener('click', async() => {
      
        try {

          const pin = (document.getElementById('pin') as any).value;

          document.getElementById('text-error').style.display = pin ? 'none' : 'inline';

          if (!pin) return;
          
          const password = CryptoJS.SHA256(pin).toString(CryptoJS.enc.Hex);
          const encryptedUser = await this.storage.get('user-hash');
          const bytes = CryptoJS.AES.decrypt(encryptedUser, password);
          var user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

          this.presentLoading();

          this.userService.recoverPassword({
            channel: 'TOTP',
            curp: user.curp, 
            email: user.email
          }, 'request').toPromise().then( resp => {
            alert.dismiss();
            next[0]({
              channel: 'TOTP',
              curp: user.curp, 
              email: user.email
            });
          } ).catch( async error => {
      
            if (error.status === 504 || error.status === 0) {
              
            } else {
              await this.showErrorMessage(
                'Incorrect data', 
                'We did not find any user with the data provided'
              );
            } 
            
          } ) .finally( () => this.hideLoading() );
    
        } catch(error) {
          
          if (error.message !== 'NO-PIN') {
            (document.getElementById('pin') as any).value = null;
            await this.showErrorMessage("Contraseña incorrecta", "Por favor verifica tu contraseña e intenta de nuevo");
          } 
    
          //this.router.navigateByUrl('/login');
  
        }

      });
      document.querySelector('#btnClose').addEventListener('click', () => alert.dismiss());
    });
  }

  public codeMailMessage(next?: any): Promise<any> {
    return this.translate.get(['Accept']).toPromise().then(async translate => {
      const alert = await this.alertController.create({
        backdropDismiss: false,
        cssClass: 'codeMailMessage',
      });
      
      const wrapper = document.querySelector('.codeMailMessage .alert-wrapper');
      wrapper.insertAdjacentHTML('afterbegin', `

        <div class="alert-head ${this.getOSClass()}">
            <h2 id="alert-1-hdr" style="font-size: 18px;" class="alert-title ${this.getOSClass()}"> ${await this.translate.get('Solo un paso más').toPromise()} </h2>
        </div>

        <img
          style="width: 50px; height: auto; margin: auto; margin-bottom: -0.7rem"
          src="./assets/header-icons/desbloqueo3.png"
          alt="UnBlock">

        <div class="alert-head ${this.getOSClass()}">
          <h2 id="alert-1-sub-hdr" style="text-align: center; font-size: 14px;" class="alert-sub-title ${this.getOSClass()}">
            ${await this.translate.get('¡REVISA TU CORREO!').toPromise()}
          </h2>
        </div>

        <div id="alert-1-msg" style="text-align: justify !important; font-size: 14px;" class="alert-message ${this.getOSClass()}">
          ${await this.translate.get('Para finalizar el proceso de desbloqueo, revisa tu correo, te deberá llegar un código de desbloqueo que deberás proporcionar a continuación').toPromise()}
        </div>

        <div style="margin-top: -1.5rem" class="alert-input-group ${this.getOSClass()}" aria-labelledby="alert-1-hdr">
            <div class="alert-input-wrapper ${this.getOSClass()}">
                <input type="text" id="token" maxlength="10" placeholder="Escribe tu código" tabindex="0" class="alert-input ${this.getOSClass()}">
            </div>
            <ion-text
              id="text-error"
              style="width: 85%; text-align: center; color: #EB445A; display: none;"
            >
              ${await this.translate.get('Code is required').toPromise()}
            </ion-text>
        </div>

        <div class="alert-button-group alert-button-group-vertical ${this.getOSClass()}">
          <ion-button
            expand="block"
            id="btnNext"
            color="primary"
            style="width: 80%; margin: auto; margin-bottom: 0.8rem; text-transform: uppercase;"
          >
            ${await this.translate.get('ACEPTAR').toPromise()}
          </ion-button>
          <ion-button
            expand="block"
            id="btnResend"
            color="primary"
            style="width: 80%; margin: auto; margin-bottom: 0.8rem; text-transform: uppercase;"
          >
            ${await this.translate.get('REENVIAR').toPromise()}
          </ion-button>
          <ion-button
            expand="block"
            id="btnClose"
            color="medium"
            style="width: 80%; margin: auto; text-transform: uppercase;"
          >
            ${ await this.translate.get('CANCELAR').toPromise()}
          </ion-button>
        </div>
      
      `);
      await alert.present();
      
      document.querySelector('#btnNext').addEventListener('click', () => {

        const form = { 
          token: (document.getElementById('token') as any).value
        };

        document.getElementById('text-error').style.display = form.token ? 'none' : 'inline';

        if (!form.token) return;
    
        this.presentLoading();
        this.userService.recoverPassword(form, 'renew').toPromise().then( async() => {
          alert.dismiss();
          next[0]();
        } ).catch( async error => {
    
          if (error.status === 504 || error.status === 0) {
            
          } else {
            await this.showErrorMessage(
              'Incorrect data', 
              'The provided authentication code is incorrect'
            );
          } 
          
        } ) .finally( () => this.hideLoading() );

      });
      document.querySelector('#btnResend').addEventListener('click', () => {

        this.presentLoading();
        this.userService.recoverPassword(next[1], 'request')
          .toPromise().finally( () => this.hideLoading() );

      });
      document.querySelector('#btnClose').addEventListener('click', () => alert.dismiss());
    });
  }

  public unblockSuccessTokenMessage(next?: any): Promise<any> {
    return this.translate.get(['Accept']).toPromise().then(async translate => {
      const alert = await this.alertController.create({
        backdropDismiss: false,
        cssClass: 'unblockSuccessMessage',
      });
      
      const wrapper = document.querySelector('.unblockSuccessMessage .alert-wrapper');
      wrapper.insertAdjacentHTML('afterbegin', `

        <div class="alert-head ${this.getOSClass()}">
            <h2 id="alert-1-hdr" style="font-size: 18px;" class="alert-title ${this.getOSClass()}"> ${await this.translate.get('Desbloqueo Exitoso').toPromise()} </h2>
        </div>

        <img
          style="width: 50px; height: auto; margin: auto; margin-bottom: -0.7rem"
          src="./assets/header-icons/candadoSi.png"
          alt="UnBlock">

        <div class="alert-head ${this.getOSClass()}">
          <h2 id="alert-1-sub-hdr" style="text-align: center; font-size: 14px;" class="alert-sub-title ${this.getOSClass()}">
            ${await this.translate.get('YA PUEDES INGRESAR').toPromise()}
          </h2>
        </div>

        <div id="alert-1-msg" style="text-align: justify !important; font-size: 14px;" class="alert-message ${this.getOSClass()}">
          ${await this.translate.get('El proceso de desbloqueo de tu <b>CLAVE DINÁMICA</b> se completo exitosamente, ya puedes ingresar nuevamente a tu Banca Móvil y/o usarla para completar operaciones en tu Banca por Internet').toPromise()} 
        </div>

        <div style="margin-top: -1.5rem" class="alert-input-group ${this.getOSClass()}" aria-labelledby="alert-1-hdr">
      
        </div>

        <div class="alert-button-group alert-button-group-vertical ${this.getOSClass()}">
          <ion-button
            expand="block"
            id="btnClose"
            color="primary"
            style="width: 80%; margin: auto; margin-bottom: 0.8rem; text-transform: uppercase;"
          >
            ${await this.translate.get('ACEPTAR').toPromise()}
          </ion-button>
        </div>

      `);
      await alert.present();
      document.querySelector('#btnClose').addEventListener('click', () => alert.dismiss());
    });
  }

  public async showErrorMessage(title?: string, text?: string): Promise<any> {
    const message = text ? text : 'Can not proccess the request right now. Try again later';
    const header = title ? title : 'Error';
    return this.translate.get([title, message, 'Accept']).toPromise().then(async translate => {
      const alert = await this.alertController.create({
        header: translate[header],
        message: translate[message],
        buttons: [
          translate.Accept
        ]
      });
      return await alert.present();
    });
  }

  private getOSClass(): string {
    return this.platform.is('ios') ? 'sc-ion-alert-ios' : 'sc-ion-alert-md';
  }

  public getFormattedDate(): string {
    return formatDate(new Date(), environment.dateFormat, environment.locale);
  }
}
