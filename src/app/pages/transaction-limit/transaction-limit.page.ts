import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PersonalInfo } from '@globals/interfaces/personal-info';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AutomaticTokenPage } from '@pages/automatic-token/automatic-token.page';
import { ClientsService } from '@services/clients/clients.service';
import { HelpersService } from '@services/helpers/helpers.service';


@Component({
  selector: 'app-transaction-limit',
  templateUrl: './transaction-limit.page.html',
  styleUrls: ['./transaction-limit.page.scss'],
})
export class TransactionLimitPage implements OnInit {

  public form: FormGroup;

  public clientId: string;

  constructor(
    private fb: FormBuilder, 
    private clientsService: ClientsService, 
    private storage: Storage,
    private modalController: ModalController,
    private helpersService: HelpersService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      "maxNumberTransactionSpei": 5,
      "maxTransactionAmountSpei": 50000,
      "maxAmountTransactionByTransactionSpei": 15000,

      "maxNumberTransaction": 5,
      "maxTransactionAmount": 50000,
      "maxAmountTransactionByTransaction": 15000,
      "locale": "es"
    });

    this.storage.get('personal-info').then( (personalInfo: PersonalInfo) => {
      this.clientId = personalInfo.id+'';
      this.clientsService.getLimits(this.clientId).toPromise().then( values => {
        console.log(values);
        
        this.form.patchValue( values );
      } );
    } );

  }


  public async saveChanges() {
    console.log('Estamos aqui');

    const modal = await this.modalController.create({
      backdropDismiss: false,
      component: AutomaticTokenPage
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();

    if (!data.accept) return;

    this.helpersService.presentLoading();

    const form = { ...this.form.value };

    this.clientsService.editLimits(this.clientId, form).toPromise().then( (resp) => {
      console.log(resp);
      this.helpersService.showSuccessMessage('Límites Actualizados', 'Los límites transaccionales se actualizaron correctamente.');
    } ).catch( () => {
      this.helpersService.showErrorMessage();
    } ).finally( () => this.helpersService.hideLoading() )
    
  }

  get content(): any {
    return document.querySelector('#content') as any;
  }

  gotBottom() {
    this.content.scrollToBottom();
  }

  gotTop() {
    this.content.scrollToTop();
  }

}

