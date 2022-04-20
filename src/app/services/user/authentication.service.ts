import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ENDPOINTS } from '@globals/endpoints';
import { Storage } from '@ionic/storage';
import { ToastController, NavController, AlertController, MenuController } from '@ionic/angular';
import { ClientsService } from '@services/clients/clients.service';
import { UserService } from './user.service';
import { User } from '@globals/interfaces/user';
import { LoginInfo } from '@globals/interfaces/login-info';
import { PersonalInfo } from '@globals/interfaces/personal-info';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { HelpersService } from '@services/helpers/helpers.service';
import { environment } from '@env';
import { CodesService } from '@services/catalogs/codes.service';
import { TranslateService } from '@ngx-translate/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

const CryptoJS = require('crypto-js');

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  timetoSessionAlert = 90;
  timetoSessionClose = 30;
  sessionAlert = null;
  authState = new BehaviorSubject(false);
  timedOut = false;
  lastPing?: Date = null;
  title = 'angular-idle-timeout';

  constructor(
    private httpClient: HttpClient,
    private storage: Storage,
    public toastController: ToastController,
    private clientsService: ClientsService,
    private navCtrl: NavController,
    private userService: UserService,
    private idle: Idle,
    private helpersService: HelpersService,
    private codesService: CodesService,
    private menu: MenuController,
    private translate: TranslateService,
    private geolocation: Geolocation
  ) {}

  // la variable booleana sirve para ver si autenticamos directos o le hacemos ingresar el pin al usuario porque es un logeo nuevo
  public async login(user: User, askForPin: boolean): Promise<any> {

    this.storage.remove('token');
    this.storage.remove('personal-info');
    this.storage.remove('login-info');
    this.helpersService.presentLoading();

    let latitude = 0; 
    let longitude = 0; 

    const position = await this.geolocation.getCurrentPosition().then( (position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      return position;
    }).catch( async(error) => {
      console.log('Error getting location', error);
      await this.helpersService.hideLoading();
      this.helpersService.showErrorMessage('Ubicación Deshabilitada', 'Para poder iniciar sesión, es necesario que tengas habilitada tu ubicación. Verifica las preferencias de tu aplicación');
      return null;
    });

    if (!position) return;

    return this.httpClient.post(ENDPOINTS.authentication, { ...user, latitude, longitude, channel: 'Mobile', shaded: true })
      .toPromise()
      .then((login: LoginInfo) => {

        if (login.userMessageGlobalisationCode === 'error.msg.session.already.active') {
          throw new Error('SESSION_ACTIVA');
        }

        this.userService.email = login.email;
        this.storage.set('token', login.base64EncodedAuthenticationKey);
        this.storage.set('login-info', login);
        return this.storage.set('token', login.base64EncodedAuthenticationKey)
          .then(() => {
            console.log('<here>');
            return this.clientsService.getClient(login.clientId.toString()).toPromise();
          });
      })
      .then((client: PersonalInfo) => {
        console.log('<here at PersonalInfo>');
        this.authState.next(true);
        this.storage.set('personal-info', client);
        this.userService.username = user.username;
        this.userService.password = user.password;
        this.userService.displayName = client.displayName;
        this.userService.curp = client.uniqueId;
        const displayName = client.displayName.trim().replace(/ +(?= )/g, '').split(' ');
        const shortName = `${displayName[0]}${ displayName[1] ? ' ' + displayName[1] : '' }`;
        this.userService.shortName = shortName;
        this.storage.set('last-client', shortName);
        this.storage.set('username', user.username);
        console.log('<here at Selfie>');
        this.clientsService.getSelfie(client.id + '').toPromise()
          .then( imageUrl => this.storage.set('image-profile', imageUrl) )
          .catch( err => {
            if (!(err.status && err.status === 200 && err.error.text)) { return; }
            this.storage.set('image-profile', err.error.text.replace(/\s/g, ''));
          } );
        console.log('<here at return codesServices>');
        return this.codesService.getMOBILE().toPromise();
      }).then( globals => {
        this.storage.set('globals', globals);
        console.log('<here at Globals>');
        console.log(globals);
        //if (askForPin) { this.navCtrl.navigateRoot(['second-login', { type: 'pin' }]); } else { this.navCtrl.navigateRoot(['dashboard']); }
        this.encryptPassword(user.password);
        this.navCtrl.navigateRoot(['dashboard']);
        this.storage.remove('timeLeft');
        return true;
      } )
      .catch( async err => {
        console.log('error authentication');
        
        
        if (err.status === 504 || err.status === 0 || (err.error && err.error.userMessageGlobalisationCode === 'error.msg.user.locked')) {
          
        } else if (err.message === 'SESSION_ACTIVA' || 
            (err.error && err.error.message || '') === 'Session already active, concurrent login is not allowed.' ||
            (err.error && err.error.errors && err.error.errors.length && err.error.errors[0].userMessageGlobalisationCode === "error.msg.session.already.active")
          ) {
          this.helpersService.showErrorMessage('No puedes iniciar sesión', 'Hemos detectado que tienes otra sesión activa y solo se permite un acceso a la vez, para continuar, cierra la otra sesión e intenta acceder nuevamente.');
        } else {
          this.helpersService.showErrorMessage('Incorrect Access', 'The credentials entered are incorrect');
        }
        throw err;
      }).finally( () => this.helpersService.hideLoading() );
  }

  private async encryptPassword(currentPassword: string) {
    const user = { 
      username: this.userService.username, 
      password: this.userService.password,
      curp: this.userService.curp,
      email: this.userService.email 
    };
    const userString = JSON.stringify(user);
    const ciphertext = CryptoJS.AES.encrypt(userString, currentPassword).toString();
    this.storage.set('user-hash', ciphertext);
  }

  public ifLoggedIn() {
    this.storage.get('token').then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }

  public simpleLogin(user: User): Observable<any> {
    return this.httpClient.post(ENDPOINTS.authentication, { ...user, channel: 'Mobile' });
  }

  public refresh() {
    this.storage.get('login-info').then( (loginInfo: LoginInfo) => {

      this.httpClient.post(ENDPOINTS.refresh, { 
        base64EncodedAuthenticationKey: loginInfo.base64EncodedAuthenticationKey, 
        username: loginInfo.username, 
        channel: 'Mobile'
      })
      .toPromise()
      .catch( () => {} )
    })
  }

  public async logout(removeAllStorage: boolean = false) {
    const keep: string[] = ['user-hash', 'last-client', 'username'];
    const saved: any[] = [];
    this.stopIdleTimer();

    await this.storage.get('login-info').then( (loginInfo: LoginInfo) => {

      if (!loginInfo || !loginInfo.base64EncodedAuthenticationKey) {
        return;
      }

      this.httpClient.post(ENDPOINTS.logout, { 
        base64EncodedAuthenticationKey: loginInfo.base64EncodedAuthenticationKey, 
        username: loginInfo.username, 
        channel: 'Mobile'
      })
      .toPromise()
      .catch( () => {} )
    });

    if (!removeAllStorage) {
      for (const key in keep) {
        const value = await this.storage.get(keep[key]);
        saved.push({ key: keep[key], value });
      }
    }
    this.storage.clear();
    for (const key in saved) {
      this.storage.set(saved[key].key, saved[key].value);
    }
    this.authState.next(false);
    this.navCtrl.navigateRoot(['/login']);
  }

  public stopIdleTimer() {
    this.idle.stop();
    this.idle.onTimeout.observers.length = 0;
    this.idle.onIdleStart.observers.length = 0;
    this.idle.onIdleEnd.observers.length = 0;
    this.idle.onTimeoutWarning.observers.length = 0;
  }


  public startIdleTimer() {
    this.stopIdleTimer();
    // Incializa variables
    this.idle.setIdle(this.timetoSessionAlert);
    this.idle.setTimeout(this.timetoSessionClose);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    // Se ejecuta cuando el idle es cancelado
    this.idle.onIdleEnd.subscribe(() => {
      this.refresh();
      const elem = document.getElementById('countdown');
      if (elem) {
        elem.innerText = ``;
      }
    });

    // Se ejecuta cuando el tiempo se acaba
    this.idle.onTimeout.subscribe(() => {
      this.cleanAllModals();
      this.sessionAlert.dismiss();
      this.menu.enable(false);
      this.logout();
    });

    // Crea mensaje de alerta
    this.idle.onIdleStart.subscribe( async() => {
      
      if (this.sessionAlert) {
        this.sessionAlert.dismiss();
      }
      this.helpersService.successMessage(
        'Are you still there?',
        await this.translate.get('Your session will be closed soon').toPromise() + ' <b id="countdown">(30 s)</b>'
      ).then(alert => {
        this.sessionAlert = alert;
        this.sessionAlert.present();
      });
    });

    // Se puede usar para hacer un conteo regresivo asignando countdown
    this.idle.onTimeoutWarning.subscribe((countdown: string) => {
      const elem = document.getElementById('countdown');
      if (elem) {
        elem.innerText = `(${countdown} s)`;
      }
    });

    // Inicia el idle
    if (!this.idle.isRunning()) {
      this.idle.watch();
    }

  }

  public cleanAllModals() {
    let modals = document.querySelectorAll('.show-modal, ion-alert, ion-backdrop');
    
    if (modals.length >= 1) {
      setTimeout(() => {
        try {
          modals[0].remove();
          this.cleanAllModals();
        } catch (error) { }
      }, 100);
    }

  }

  public isAuthenticated() {
    return this.authState.value || environment.mockLogin;
  }
}
