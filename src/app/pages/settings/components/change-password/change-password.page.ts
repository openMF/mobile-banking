import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as CustomValidators from '@globals/custom.validator';
import { UserService } from '@services/user/user.service';
import { HelpersService } from '@services/helpers/helpers.service';
import { MenuController, ModalController } from '@ionic/angular';
import { AuthenticationService } from '@services/user/authentication.service';
import { AutomaticTokenPage } from '@pages/automatic-token/automatic-token.page';
import { Storage } from '@ionic/storage';
import { TotpService } from '@services/totp/totp.service';

declare var Authenticator: any;
var CryptoJS = require("crypto-js");

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  form: FormGroup;
  inputTypes: any = {
    pin: {
      icon: true,
      type: 'password'
    },
    newPassword: {
      icon: true,
      type: 'password'
    },
    confirmPassword: {
      icon: true,
      type: 'password'
    },
    oldPassword: {
      icon: true,
      type: 'password'
    },
  }

  constructor(
    private router: Router, 
    public formBuilder: FormBuilder, 
    public menuCtrl: MenuController, 
    private userService: UserService, 
    private helpersService: HelpersService,
    private authenticationService: AuthenticationService,
    protected modalController: ModalController,
    protected storage: Storage,
    private totpService: TotpService,
  ) {
    this.form = formBuilder.group({
      oldPassword: ["", [Validators.required, Validators.minLength(8)]],
      newPassword: ["",
        Validators.compose([
          Validators.required,
          CustomValidators.ValidatePassword
        ])
      ],
      confirmPassword: ["", Validators.required]
    }, {
      validator: CustomValidators.ValidateMatch('newPassword', 'confirmPassword')
    });
  }

  ngOnInit() {
  }


  register() {
    console.log("hacer peticion de registro")
    this.router.navigateByUrl('/dashboard'); //second-login
  }

  viewPassword(inputName: string) {
    this.inputTypes[inputName].icon = !this.inputTypes[inputName].icon;
    this.inputTypes[inputName].type = this.inputTypes[inputName].type === 'password' && 'text' || 'password';
  }

  toOnlyRegex(key: string, regex: string, uppercase: boolean = true) {
    const inputName = this.form.get(key);
    inputName.valueChanges.subscribe(value => inputName.setValue( (uppercase ? value.toUpperCase() : value).replace(new RegExp(regex, 'g'), ""), { emitEvent: false }));
  }

  async getCurrentUser(): Promise<any> {

    try {

      const oldPassword = this.form.get('oldPassword').value;

      if (!oldPassword) {
        throw new Error('Contraseña Incorrecta');
      }
      
      const password = CryptoJS.SHA256(oldPassword).toString(CryptoJS.enc.Hex);
      const encryptedUser = await this.storage.get('user-hash');
      const bytes = CryptoJS.AES.decrypt(encryptedUser, password);
      var usuario = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
     
      return Promise.resolve({username: usuario.username, password: usuario.password});

    } catch(error) {
      
      await this.helpersService.showErrorMessage("Contraseña incorrecta", "Por favor verifica tu contraseña e intenta de nuevo");

      return Promise.resolve(null);
    }
    
  }

  async changePassword() {

    const usuario = await this.getCurrentUser();

    if (!usuario) {
      return;
    }

    const modal = await this.modalController.create({
      component: AutomaticTokenPage
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    
    if (!data.accept) return;

      const form = { ...this.form.value };

      this.helpersService.presentLoading();

      const formData = {
        shaded: true,
        password: CryptoJS.SHA256(form.newPassword).toString(CryptoJS.enc.Hex),
        repeatPassword: CryptoJS.SHA256(form.confirmPassword).toString(CryptoJS.enc.Hex)
      }

      this.userService.changeData(formData)
        .toPromise()
        .then( async () => {
          await this.helpersService.showSuccessMessage('Successful change','Your password has been modified correctly');
          this.authenticationService.logout(true);
          this.totpService.signUp({...usuario, renew: true, renewPassword: true, newPassword: formData.password})
            .toPromise()
            .then( async resp => {
              this.storage.set('totpSecret', resp.secret);
              const code = await Authenticator.generateToken(resp.secret);
             
              return this.totpService.signupConfirmSecret({
                username: usuario.username,
                code
              }).toPromise();
            } ).catch( () => { } );
        })
        .catch( async error => {
          if (error.status === 504 || error.status === 0) {
            
          } else if (error.error.userMessageGlobalisationCode === 'error.msg.password.already.used') {
            await this.helpersService.showErrorMessage('Old password','This password has already been used before, enter a different password');
          } else {
            this.helpersService.showErrorMessage();
          }
        })
        .finally( () => this.helpersService.hideLoading() );

    
  }

}
