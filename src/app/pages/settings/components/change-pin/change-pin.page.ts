import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserService } from '@services/user/user.service';
import { Storage } from '@ionic/storage';
import { HelpersService } from '@services/helpers/helpers.service';

var CryptoJS = require("crypto-js");

@Component({
  selector: 'app-change-pin',
  templateUrl: './change-pin.page.html',
  styleUrls: ['./change-pin.page.scss'],
})
export class ChangePinPage implements OnInit {

  public limitSelected: number = 4;

  public seletedNumbers: number[] = [];

  public show: boolean = false;

  public pin: string = '';

  public type: 'pin' | 'confirm-pin' | 'change-pin' = 'pin';

  private errorNumberCount: number = 0;

  public incorrectPin: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private storage: Storage,
    private userService: UserService,
    private helpersService: HelpersService
  ) { }

  ngOnInit() {

    const { type } = this.activatedRoute.snapshot.params;
    const { code } = this.activatedRoute.snapshot.queryParams;

    if (type !== 'pin' && type !== 'confirm-pin' && type !== 'change-pin') {
      this.type = 'pin';
    } else {
      this.type = type;
    }
    this.pin = code || '';

  }

  get lenSelectedNumbers(): number {
    return this.seletedNumbers.length;
  }

  get buttonDisabled(): boolean {
    let disabled: boolean = true;

    switch (this.type) {
      case 'change-pin':
        disabled = this.lenSelectedNumbers !== this.limitSelected;
        break;

      case 'confirm-pin':
        disabled = this.lenSelectedNumbers !== this.limitSelected || this.pin !== this.seletedNumbers.join('');
        break;

      case 'pin':
        disabled = this.lenSelectedNumbers !== this.limitSelected;
        break;
    }

    return disabled;
  }

  get buttonText(): string {
    let label: string = '';

    switch (this.type) {
      case 'change-pin':
        label = 'Continue';
        break;

      case 'confirm-pin':
        label = 'Accept';
        break;

      case 'pin':
        label = 'Change';
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
    if (!this.seletedNumbers.length) {
      return;
    }
    this.seletedNumbers.pop();
    console.log(this.seletedNumbers);
  }

  public goToRoute(): void {
    switch (this.type) {

      case 'pin':
        console.log('lo mando palli')
        this.decryptUser();
        break;

      case 'change-pin':
        console.log('toy aki')
        this.navCtrl.navigateRoot(['/settings/change-pin', { type: 'confirm-pin' }], { queryParams: { code: this.seletedNumbers.join('') } })
        break;

      case 'confirm-pin':
        this.encryptPIN();
        this.helpersService.hideLoading()
        this.helpersService.showSuccessMessage('Successful change','Your PIN has been modified correctly', '/settings')
        break;
    }
  }

  public headerTitle() {
    if (this.type === 'pin') return 'Enter current pin';
    if (this.type === 'change-pin') return 'New PIN';
    if (this.type === 'confirm-pin' && this.limitSelected === this.lenSelectedNumbers && this.buttonDisabled) {
      this.incorrectPin = true;
    };
    if (this.type === 'confirm-pin') return 'Confirm PIN';

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
    this.helpersService.presentLoading()
    const PIN = this.seletedNumbers.join('');

    let user = { username: this.userService.username, password: this.userService.password };
    let userString = JSON.stringify(user);

    var ciphertext = CryptoJS.AES.encrypt(userString, PIN).toString();
    this.storage.set('user-hash', ciphertext);
  }

  private async decryptUser() {
    console.log('hola')
    const PIN = this.seletedNumbers.join('');
    this.incorrectPin = false;
    this.storage.get('user-hash')
      .then(encryptedUser => {
        var bytes = CryptoJS.AES.decrypt(encryptedUser, PIN);
        var usuario = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        this.userService.username=usuario.username
        this.userService.password=usuario.password
        console.log(usuario)
        this.navCtrl.navigateRoot(['/settings/change-pin', { type: 'change-pin' }] )
   
      })
      .catch(err => {
        console.log(err);
        //alert("El PIN ingresado es incorrecto");
        // this.helpersService.showErrorMessage();
        this.incorrectPin = true;
        this.seletedNumbers = [];
        this.errorNumberCount++;
        // si el usuario pone mal el pin 3 veces, lo mandamos al login y borramos el hash guardado
        if (this.errorNumberCount == 3) {
          this.storage.remove('user-hash');
          this.navCtrl.navigateRoot(['/login']);
        }
      });
  }
}
