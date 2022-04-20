import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '@services/user/authentication.service';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { HelpersService } from '@services/helpers/helpers.service';

const CryptoJS = require('crypto-js');

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  icon = true;
  type = 'password';
  loginForm: FormGroup;
  disabledButtons = false;
  interval;
  textTitle = '';
  showImage = true;

  constructor(
      public formBuilder: FormBuilder,
      private authenticationService: AuthenticationService,
      private navCtrl: NavController,
      private helpersService: HelpersService,
      protected translate: TranslateService
    ) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(10)
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])]
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.showImage = true;
  }

  ionViewWillLeave() {
    this.showImage = false;
  }

  public Route(route: string) {
    this.showImage = false;
    this.navCtrl.navigateRoot([route]);
  }

  toOnlyRegex(key: string, regex: string, uppercase: boolean = true) {
    const inputName = this.loginForm.get(key);
    // tslint:disable-next-line: max-line-length
    inputName.valueChanges.subscribe(value => inputName.setValue((uppercase ? value.toUpperCase() : value).replace(new RegExp(regex, 'g'), ''), { emitEvent: false }));
  }

  signIn() {
    const form = { ...this.loginForm.value };
    form.password = CryptoJS.SHA256(form.password).toString(CryptoJS.enc.Hex);
    this.authenticationService.login(form, true).catch( async err => {
      if (err.error && err.error.userMessageGlobalisationCode === 'error.msg.user.locked') {
        this.blockYourAccount(form);
      }
    });
  }

  blockYourAccount(form) {
    this.helpersService.blockYourAccountMessage([
      () => this.sendUnblockMail(),
    ]);
  }

  sendUnblockMail() {
    this.helpersService.sendUnblockMailMessage([
      () => this.getCodeMail(),
    ]);
  }

  getCodeMail() {
    this.helpersService.getCodeMailMessage([
      () => this.unblockSuccess(),
    ]);
  }

  unblockSuccess() {
    this.helpersService.unblockSuccessMessage([
      () => {},
    ]);
  }

  viewPassword() {
    if (this.icon) {
      this.icon = false;
      this.type = 'text';
    } else {
      this.icon = true;
      this.type = 'password';
    }
  }

}
