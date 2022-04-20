import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as CustomValidators from '@globals/custom.validator';
import { HelpersService } from '@services/helpers/helpers.service';
import { UserService } from '@services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';

var CryptoJS = require("crypto-js");

@Component({
  selector: 'app-enter-code',
  templateUrl: './enter-code.page.html',
  styleUrls: ['./enter-code.page.scss'],
})
export class EnterCodePage implements OnInit {
  
icon: boolean = true;
reIcon: boolean = true;
type: string = 'password';
reType: string = 'password';
renewForm: FormGroup;

constructor(
  public formBuilder: FormBuilder,
  private helpersService: HelpersService,
  private userService: UserService,
  private activatedRoute: ActivatedRoute,
  private router: Router
) { }

ngOnInit() {

  this.renewForm = this.formBuilder.group({
    shaded: [true],
    token: ["", [Validators.required, Validators.minLength(10)]],
    password: ["", [Validators.required, CustomValidators.ValidatePassword]],
    repeatPassword: ["", [Validators.required]],
  }, {
    validator: CustomValidators.ValidateMatch('password', 'repeatPassword')
  });

}

renew() {

  const form = { ...this.renewForm.value };
  form.password = CryptoJS.SHA256(form.password).toString(CryptoJS.enc.Hex);
  form.repeatPassword = CryptoJS.SHA256(form.repeatPassword).toString(CryptoJS.enc.Hex);

  this.helpersService.presentLoading();
  this.userService.recoverPassword(form, 'renew').toPromise().then( async() => {
    await this.helpersService.unblockSuccessMessage(
    );

    this.router.navigate(['/login']);

  } ).catch( async error => {

    if (error.status === 504 || error.status === 0) {
      
    } else if (error.error.userMessageGlobalisationCode === 'error.msg.password.already.used') {
      await this.helpersService.showErrorMessage('Old password','This password has already been used before, enter a different password');
    } else {
      await this.helpersService.showErrorMessage(
        'Incorrect data', 
        'The provided authentication code is incorrect'
      );
    } 
    
  } ) .finally( () => this.helpersService.hideLoading() );

}

toOnlyRegex(key: string, regex: string, uppercase: boolean = true) {
  const inputName = this.renewForm.get(key);
  inputName.valueChanges.subscribe(value => inputName.setValue( (uppercase ? value.toUpperCase() : value).replace(new RegExp(regex, 'g'), ""), { emitEvent: false }));
}

viewRePassword() {
  if (this.reIcon) {
    console.log("view repassword");
    this.reIcon = false;
    this.reType = "text";
  } else {
    console.log("not view repassword");
    this.reIcon = true;
    this.reType = "password";
  }
}

viewPassword() {
  if (this.icon) {
    console.log("view password");
    this.icon = false;
    this.type = "text";
  } else {
    console.log("not view password");
    this.icon = true;
    this.type = "password";
  }
}

}
