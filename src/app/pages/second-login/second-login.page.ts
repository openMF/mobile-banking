import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from '@services/user/authentication.service';
import { NavController } from '@ionic/angular';
import { UserService } from '@services/user/user.service';
import { ModalController } from '@ionic/angular';
import { HelpersService } from '@services/helpers/helpers.service';
import { TotpService } from '@services/totp/totp.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const CryptoJS = require('crypto-js');

@Component({
  selector: 'app-second-login',
  templateUrl: './second-login.page.html',
  styleUrls: ['./second-login.page.scss']
})
export class SecondLoginPage implements OnInit {

  public limitSelected = 4;
  public seletedNumbers: number[] = [];
  public show = false;
  public pin = '';
  public type: 'pin' | 'confirm-pin' | 'login' = 'pin';
  private errorNumberCount = 0;
  public incorrectPin = false;
  public lastClientLogin = '';
  public softTokenBlocked = false;
  public loginForm: FormGroup;
  public icon = true;
  public inputType = 'password';
  public attempts: number = 0;
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private storage: Storage,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private helpersService: HelpersService,
    public modalCtrl: ModalController,
    private totpService: TotpService,
    public formBuilder: FormBuilder
  ) { 
  }

  ngOnInit() {
    const { type } = this.activatedRoute.snapshot.params;
    const { code } = this.activatedRoute.snapshot.queryParams;
    if (type !== 'pin' && type !== 'confirm-pin' && type !== 'login') {
      this.type = 'pin';
    } else {
      this.type = type;
    }
    this.pin = code || '';
    this.storage.get('last-client').then( lastCient => this.lastClientLogin = lastCient );

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(10)
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])]
    });

    this.storage.get('username').then( username => {
      this.loginForm.get('username').setValue(username);
    } );

    this.checkSoftTokenBlocked();
  }

  get lenSelectedNumbers(): number {
    return this.seletedNumbers.length;
  }

  get buttonDisabled(): boolean {
    let disabled = true;
    switch (this.type) {
      case 'pin':
        disabled = this.lenSelectedNumbers !== this.limitSelected;
        break;
      case 'confirm-pin':
        disabled = this.lenSelectedNumbers !== this.limitSelected || this.pin !== this.seletedNumbers.join('');
        break;
      case 'login':
        disabled = this.lenSelectedNumbers !== this.limitSelected;
        break;
    }
    return disabled;
  }

  get buttonText(): string {
    let label = '';
    switch (this.type) {
      case 'pin':
        label = 'Continue';
        break;
      case 'confirm-pin':
        label = 'Accept';
        break;
      case 'login':
        label = 'Sign in';
        break;
    }

    return label;
  }

  public add(number: number): void {
    this.incorrectPin = false;
    if (this.seletedNumbers.length >= this.limitSelected) {
      return;
    }
    this.seletedNumbers.push(number);
    console.log(this.seletedNumbers);
  }

  public delete(): void {
    this.incorrectPin = false;
    if (!this.seletedNumbers.length) {
      return;
    }
    this.seletedNumbers.pop();
    console.log(this.seletedNumbers);
  }

  viewPassword() {
    if (this.icon) {
      this.icon = false;
      this.inputType = 'text';
    } else {
      this.icon = true;
      this.inputType = 'password';
    }
  }

  public goToRoute(): void {
    switch (this.type) {
      case 'pin':
        this.navCtrl.navigateRoot(['/second-login', { type: 'confirm-pin' }], { queryParams: { code: this.seletedNumbers.join('') } });
        break;
      case 'confirm-pin':
        this.encryptPIN();
        this.navCtrl.navigateRoot(['/dashboard']);
        break;
      case 'login':
        //this.decryptUser();
        this.signIn();
        break;
    }
  }

  public headerTitle() {
    if (this.type === 'login') { return ''; }
    if (this.type === 'pin') { return 'Set PIN'; }
    if (this.type === 'confirm-pin' && this.limitSelected === this.lenSelectedNumbers && this.buttonDisabled) {
      this.incorrectPin = true;
    }
    if (this.type === 'confirm-pin') { return 'Confirm PIN'; }
  }

  public showBackButton() {
    return this.type === 'pin' || this.type === 'confirm-pin' ? true : false;
  }

  public showRegisterButton() {
    return this.type === 'pin' || this.type === 'confirm-pin' ? false : true;
  }

  public showSignInButton() {
    return this.type === 'pin' || this.type === 'confirm-pin' ? false : true;
  }

  private async encryptPIN() {
    const PIN = this.seletedNumbers.join('');
    const user = { 
      username: this.userService.username, 
      password: this.userService.password,
      curp: this.userService.curp,
      email: this.userService.email 
    };
    const userString = JSON.stringify(user);
    const ciphertext = CryptoJS.AES.encrypt(userString, PIN).toString();
    this.storage.set('user-hash', ciphertext);
  }

  public goLogin() {
    this.authenticationService.logout(true);
  }

  private async decryptUser() {
    const PIN = this.seletedNumbers.join('');
    this.incorrectPin = false;
    this.storage.get('user-hash')
      .then(encryptedUser => {
        const bytes = CryptoJS.AES.decrypt(encryptedUser, PIN);
        const usuario = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        this.authenticationService.login({username: usuario.username, password: usuario.password}, false);
      })
      .catch(err => {
        console.log(err);
        // alert("El PIN ingresado es incorrecto");
        this.incorrectPin = true;
        this.seletedNumbers = [];
        this.errorNumberCount++;
        // si el usuario pone mal el pin 3 veces, lo mandamos al login y borramos el hash guardado
        if (this.errorNumberCount === 3) {
          this.storage.remove('user-hash');
          this.navCtrl.navigateRoot(['/login']);
        }
      });
  }

  signIn() {
    const form = { ...this.loginForm.value };
    form.password = CryptoJS.SHA256(form.password).toString(CryptoJS.enc.Hex);
    this.authenticationService.login(form, true).catch( async err => {
      if (err.error && err.error.userMessageGlobalisationCode === 'error.msg.not.authenticated') {
        this.attempts++;
        if (this.attempts >= 3) {
          this.goLogin();
          this.attempts = 0;
        }
      }
    });
  }

  async checkSoftTokenBlocked(event?: any) {

    if (this.type !== 'login') return;
    const username = await this.storage.get('username');
    if (!username) return;

    this.totpService.verify({code: '000000', username}).toPromise()
      .then( resp => this.softTokenBlocked = resp === 'LOCKED')
      .catch( () => this.softTokenBlocked = false )
      .finally( () => event ? event.target.complete() : null );
  }

  openUnlock() {
    this.helpersService.unlockDinamicKeyMessage([
      (params) => this.codeMail(params),
    ]);
  }

  codeMail(params) {
    this.helpersService.codeMailMessage([
      () => {
        this.unblockSuccessToken();
        this.checkSoftTokenBlocked();
      },
      params
    ]);
  }

  unblockSuccessToken() {
    this.helpersService.unblockSuccessTokenMessage([
      () => {},
    ]);
  }

  toOnlyRegex(key: string, regex: string, uppercase: boolean = true) {
    const inputName = this.loginForm.get(key);
    // tslint:disable-next-line: max-line-length
    inputName.valueChanges.subscribe(value => inputName.setValue((uppercase ? value.toUpperCase() : value).replace(new RegExp(regex, 'g'), ''), { emitEvent: false }));
  }

  // async openUnlock() {
    // const modal = await this.modalCtrl.create({
        // component: UnlockDinamicKeyPage,
        // cssClass: 'modal'
      // });
    // return await modal.present();
  // }

}
