import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import * as CustomValidators from '@globals/custom.validator';
import { UserService } from '@services/user/user.service';
import { Storage } from '@ionic/storage';
import { LoginInfo } from '@globals/interfaces/login-info';
import { ClientsService } from '@services/clients/clients.service';
import { HelpersService } from '@services/helpers/helpers.service';
import { AutomaticTokenPage } from '@pages/automatic-token/automatic-token.page';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';


@Component({
  selector: 'app-get-email',
  templateUrl: './get-email.page.html',
  styleUrls: ['./get-email.page.scss'],
})
export class GetEmailPage implements OnInit {
  form: FormGroup;

  constructor(
      public formBuilder: FormBuilder, 
      private userService: UserService, 
      private storage: Storage, 
      private clientsService: ClientsService, 
      private helpersService: HelpersService,
      protected modalController: ModalController,
      private router: Router
    ) {

      this.form = formBuilder.group({
        channel: ["Movil"],
        curp: ["", Validators.compose([
          Validators.required,
          CustomValidators.ValidateCurp
        ])],
        email: ["", Validators.compose([
          Validators.required,
          CustomValidators.ValidateEmail
        ])]
    });
  
  }

  ngOnInit() {
  }

  toOnlyRegex(key: string, regex: string) {
    const inputName = this.form.get(key);
    inputName.valueChanges.subscribe(value => inputName.setValue( value.toUpperCase().replace(new RegExp(regex, 'g'), ""), { emitEvent: false }));
  }

  getActivationCode(presentAlert: boolean = true) {

    const form = { ...this.form.value, channel: 'UserEnable' };

    this.helpersService.presentLoading();
    this.userService.recoverPassword(form, 'request').toPromise().then( resp => {
      this.router.navigate(['/login/enter-code'])  
      return 
    } ).catch( async error => {

      if (error.status === 504 || error.status === 0) {
        
      } else {
        await this.helpersService.showErrorMessage(
          'Incorrect data', 
          'We did not find any user with the data provided'
        );
      } 
      
    } ) .finally( () => this.helpersService.hideLoading()  

     
     )
      
  

  }
}