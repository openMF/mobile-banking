import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as CustomValidators from '@globals/custom.validator';
import { UserService } from '@services/user/user.service';
import { ClientsService } from '@services/clients/clients.service';
import { HelpersService } from '@services/helpers/helpers.service';
import { LoginInfo } from '@globals/interfaces/login-info';
import { Storage } from '@ionic/storage';
import { AutomaticTokenPage } from '@pages/automatic-token/automatic-token.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-change-phone',
  templateUrl: './change-phone.page.html',
  styleUrls: ['./change-phone.page.scss'],
})
export class ChangePhonePage implements OnInit {

  form: FormGroup;

  constructor(public formBuilder: FormBuilder,
    protected modalController: ModalController,
    private userService: UserService,
    private clientsService: ClientsService,
    private helpersService: HelpersService,
    private storage: Storage
    ) {

    this.form = formBuilder.group({
      shaded: true,
      phone: ["", Validators.compose([
        Validators.required,
        CustomValidators.ValidatePhoneNumber
      ])]
    })
  }

  ngOnInit() {
    this.clientsService.getLoginInfo()
      .then((data: LoginInfo) => {
        this.form.patchValue({
          phone: data.phone
        });
      });
  }

  async changePhone() {
    
    if (this.form.invalid) { return }

    const modal = await this.modalController.create({
      component: AutomaticTokenPage
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    
    if (!data.accept) return;

    const form = { ...this.form.value };
    this.helpersService.presentLoading()
    this.userService.changeData(form)
      .toPromise()
      .then(() => {
        this.updatePhone(form.phone);
        this.helpersService.showSuccessMessage('Successful change', 'Your phone has been modified correctly')
      })
      .catch( async error => {
        if (error.status === 504 || error.status === 0) {
          
        } else {
          this.helpersService.showErrorMessage();
        }
      })
      .finally(() => this.helpersService.hideLoading())
  }

  toOnlyRegex(key: string, regex: string) {
    const inputName = this.form.get(key);
    inputName.valueChanges.subscribe(value => inputName.setValue( value.toUpperCase().replace(new RegExp(regex, 'g'), ""), { emitEvent: false }));
  }

  private updatePhone(phone: string): void {
    this.clientsService.getLoginInfo()
      .then((data: LoginInfo) => {
        data.phone = phone;
        this.storage.set('login-info', data);
      });
  }

}
