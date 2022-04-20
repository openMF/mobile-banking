import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import * as CustomValidators from '@globals/custom.validator';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { TitleCasePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { CodesService } from '@services/catalogs/codes.service';

var CryptoJS = require("crypto-js");

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  states: any[] = [];
  public okText: string;
  public backText: string;
  icon: boolean = true;
  reIcon: boolean = true;
  type: string = 'password';
  reType: string = 'password';
  registerForm: FormGroup;
  registrationType: 'client' | 'social-program';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public menuCtrl: MenuController,
    public storage: Storage,
    public alertController: AlertController,
    private titleCase: TitleCasePipe,
    private translate: TranslateService,
    private codesService: CodesService
  ) {

    this.registrationType = this.activatedRoute.snapshot.params['type'];

    this.registerForm = formBuilder.group({
      username: [""],
      password: ["", [Validators.required, CustomValidators.ValidatePassword]],
      confirmPassword: ["", [Validators.required]],
      email: ["", [Validators.required, CustomValidators.ValidateEmail]],
      firstName: ["", Validators.compose([
        Validators.required,
        Validators.minLength(2),
        CustomValidators.ValidateText

      ])],
      mobileNumber: ["", Validators.compose([
        Validators.required,
        CustomValidators.ValidatePhoneNumber
      ])],
      surName: ["", Validators.compose([
        // se comenta por QA 
        //Validators.required,
        Validators.minLength(2),
        CustomValidators.ValidateText
      ])],
      lastName: ["", Validators.compose([
        Validators.required,
        Validators.minLength(2),
        CustomValidators.ValidateText
      ])],
      gender:  ["", Validators.compose([
        Validators.required,])],
      entityBirth:  ["", Validators.compose([
          Validators.required,])],
    }, {
      validator: CustomValidators.ValidateMatch('password', 'confirmPassword')
    });

    // if (this.registrationType === 'client') {
    //   this.registerForm.addControl('accountNumber', formBuilder.control('', [
    //     Validators.required,
    //     CustomValidators.ValidateClientNumber
    //   ]));
    // }
  }

  ngOnInit() {
    // this.storage.get('registration').then(data => {
    //   if (data) {
    //     this.registerForm.patchValue({ ...data, confirmPassword: data.password });
    //   }
    // });
    this.codesService.getSTATES().toPromise()
    .then(states => this.states = states)
  
    this.translate.get([
      'Continue',
      'Back'
    ]).subscribe((resp: any) => {
      this.okText = resp['Continue'];
      this.backText = resp['Back'];
    })

    this.storage.remove('registration');
  }

  getOkText() {
    return this.okText;
  }

  getBackText() {
    return this.backText;
  }
  register() {

    const form = { ...this.registerForm.value };
    form.password = CryptoJS.SHA256(form.password).toString(CryptoJS.enc.Hex)
    delete form.confirmPassword;

    this.storage.set('registration', form).then(() => {
      this.router.navigateByUrl(`/registration/${this.registrationType}/tab4`); //second-login
    });

  }

  toOnlyRegex(key: string, regex: string, uppercase: boolean = true) {
    const inputName = this.registerForm.get(key);
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
