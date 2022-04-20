import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import * as CustomValidators from '@globals/custom.validator';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  icon: boolean = true;
  reIcon: boolean = true;
  type: string = 'password';
  reType: string = 'password';
  registerForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public menuCtrl: MenuController) {
    this.registerForm = formBuilder.group({
      username: ["", Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])],
      password: ["", Validators.compose([
        Validators.required,
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])],
      accountNumber: ["", Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]{9,9}$')
      ])],
      phoneNumber: ["", Validators.compose([
        Validators.required,
        CustomValidators.ValidatePhoneNumber
      ])],
      confirmPassword: ["", Validators.compose([
        Validators.required,
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])],
      email: ["", Validators.compose([
        Validators.required,
        CustomValidators.ValidateEmail
      ])]
    }, {
      validator: CustomValidators.ValidateMatch('password', 'confirmPassword')
    });
  }

  ngOnInit() {
  }

  register() {
  }

  viewRePassword() {
    if (this.reIcon) {
      this.reIcon = false;
      this.reType = "text";
    } else {
      this.reIcon = true;
      this.reType = "password";
    }
  }

  viewPassword() {
    if (this.icon) {
      this.icon = false;
      this.type = "text";
    } else {
      this.icon = true;
      this.type = "password";
    }
  }

}
