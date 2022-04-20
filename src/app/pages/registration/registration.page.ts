import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as CustomValidators from '@globals/custom.validator';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  icon: boolean = true;
  reIcon: boolean = true;
  type: string = 'password';
  reType: string = 'password';
  registerForm: FormGroup;
  imageSrc = '/assets/sample.jpg';

  selectFile(event: any) {
    const file = event.target.files.item(0);
    const reader = new FileReader();
    reader.onload = (e: any) => (this.imageSrc = e.target.result);
    reader.readAsDataURL(file);
  }

  constructor(
      private router:Router, 
      public formBuilder: FormBuilder, 
      public menuCtrl: MenuController, 
      private alertController: AlertController
    ) { 
    this.registerForm = formBuilder.group({
      username: ["", Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])],
      password: ["", Validators.compose([
        Validators.required,
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
        CustomValidators.ValidatePassword
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
    this.menuCtrl.enable(false);
    this.menuCtrl.swipeGesture(false);
  }

  register() {
    console.log("hacer peticion de registro")
    //this.router.navigateByUrl('/dashboard'); //second-login
    this.presentAlertPrompt();
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

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Solo un paso más',
      subHeader: '¡Revisa tu correo!',
      message: 'Para completar el registro, revisa tu correo, te deberá haber llegado un código de activación (sí el código no te llego selecciona la opción de reenviar) que deberás proporcionar a continuación. ',
      inputs: [
        {
          name: 'codigoActivacion',
          type: 'text',
          placeholder: 'Código de activación'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Reenviar',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

}
