import { Component, OnInit } from '@angular/core';
import { ISettings } from '@components/card-account/card-account.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Bank, ManageAccountPage } from './components/manage-account/manage-account.page';
import { HelpersService } from '@services/helpers/helpers.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ClientsService } from '@services/clients/clients.service';
import { Storage } from '@ionic/storage';
import { Beneficiarie } from '@globals/interfaces/beneficiarie';
import { PersonalInfo } from '@globals/interfaces/personal-info';
import { CardAccount } from '@globals/classes/card-account';
import { UserService } from '@services/user/user.service';
import { LoginInfo } from '@globals/interfaces/login-info';
import * as CustomValidators from '@globals/custom.validator';
import { TransferSuccessPage } from './components/transfer-success/transfer-success.page';
import { environment } from '@env';
import { CodesService } from '@services/catalogs/codes.service';
import { AutomaticTokenPage } from '@pages/automatic-token/automatic-token.page';

export class accountTransferTPT {
  type: string = "tpt";
  fromOfficeId: number;
  fromClientId: number;
  fromAccountType: number;
  fromAccountId: number;

  channel: string = 'Mobile';
  toOfficeId: number;
  toClientId: number;
  toAccountType: number;
  toAccountId: number;

  dateFormat: string = environment.dateFormat;
  locale: string = environment.locale;
  transferDate: string;
  note: string;

  transferAmount: number;
  transferDescription: string;
}

export class accountTransferEXT {
  type: string = "ext";
  fromAccountId: number;
  accountNumber: string;
  channel: string = 'Mobile';
  dateFormat: string = environment.dateFormat;
  locale: string = environment.locale;
  note: string;
  routingCode: string;
  receiptNumber: string;
  // siempre es 2 porque es SPEI
  paymentTypeId: number = 2;
  transactionAmount: number;
  transactionDate: string;
}

@Component({
  selector: 'app-tranfers',
  templateUrl: './transfers.page.html',
  styleUrls: ['./transfers.page.scss'],
})
export class TransfersPage implements OnInit {

  public settings: ISettings = {
    accountSize: 'small',
    balanceSize: 'large',
    cardWidth: '50%',
    spaceBetween: 0,
    orientation: 'horizontal'
  };

  private accountSelected: CardAccount;

  public accounts: CardAccount[] = [];

  public savedAccounts: Beneficiarie[] = []
  public savedAccountsFiltered: Beneficiarie[] = []
  public myAccounts: Beneficiarie[] = [];
  public transferForm: FormGroup;

  public isBeneficiarieSelected = false;

  private personalInfo: PersonalInfo;
  private loginInfo: LoginInfo;

  private beneficiarieSelected: Beneficiarie;

  public banks = {};

  public flag: boolean = false;
  public showRFC: boolean = false;
  public beneficiarieSearch: string = "";

  private globalConfig: any;

  constructor(
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    public modalController: ModalController,
    public helpersService: HelpersService,
    public translate: TranslateService,
    public router: Router,
    private clientsService: ClientsService,
    private userService: UserService,
    private codesService: CodesService,
    private storage: Storage
  ) {
    this.transferForm = formBuilder.group({
      transferAmount: ['', Validators.required],
      transferDescription: ['', Validators.required],
      concept: [''],
      rfc: ['']
    });
  }

  ngOnInit() {
    console.log('Transfer page init...')
    this.transferForm.get('transferAmount').valueChanges.subscribe( (data: string) => {

      const stringText = (data || '').replace(/[^0-9]/g, '');
      let text: string;
      const len = stringText.length;

      if (len === 0 || parseInt(stringText) === 0) {
        text = '';   
      }  else if (len >= 3) {
        const pos = len - 2;
        text = stringText.slice( stringText.slice(0, 1) === '0' && len > 3 ? 1 : 0, pos) + '.' + stringText.slice(pos);
      } else {
        text = '0.'+stringText;
      }

      this.transferForm.get('transferAmount').setValue( text.replace(/\B(?=(\d{3})+(?!\d))/g, ","), {emitEvent: false});

    } );
  }

  ionViewDidEnter() {
    this.initialize();
  }

  private initialize() {
    this.flag = false;
    this.isBeneficiarieSelected = false;
    //this.helpersService.presentLoading();

    Promise.all([
      this.clientsService.getBeneficiariesTPT().toPromise(),
      this.clientsService.getBeneficiariesEXT().toPromise(),

      this.clientsService.getPersonalInfo(),
      this.clientsService.getLoginInfo(),
      this.storage.get('globals'),
      this.clientsService.getBanks().toPromise()
    ]
    )
      .then(async res => {
        console.log(res);
        this.savedAccounts = [...res[0], ...res[1]];
        this.userService.beneficiaries = this.savedAccounts;
        this.savedAccountsFiltered = this.savedAccounts;
        this.personalInfo = res[2];
        this.loginInfo = res[3];
        this.globalConfig = res[4];
        res[5].map( (bank: Bank) => this.banks[bank.id] = bank );
        
        await this.getAccounts();
        
        this.userService.myAccounts = this.myAccounts;
        return res;
      })
      .catch(err => {
        console.log(err);
        this.helpersService.showErrorMessage();
      })
      .finally(() => {
        this.flag = true;
        //this.helpersService.hideLoading();
      })
  }

  get content(): any {
    return document.querySelector('#content') as any;
  }

  identify(index: number, item: Beneficiarie) {
    return item.accountNumber;
  }

  toOnlyRegex(key: string, regex: string, uppercase: boolean = true) {
    const inputName = this.transferForm.get(key);
    inputName.valueChanges.subscribe(value => inputName.setValue( (uppercase ? (value || '').toUpperCase() : value).replace(new RegExp(regex, 'g'), ""), { emitEvent: false }));
  }

  async onManageAccount(index?: number) {
    console.log(index);

    if (index === undefined) {
      const modal = await this.modalController.create({
        component: ManageAccountPage,
        componentProps: {
          'type': 'Create'
        }
      });
      modal.onDidDismiss().then(() => {
        this.initialize();
      });
      return await modal.present();
    } else {
      this.translate.get(['Update', 'Do you want to update the bank account?']).subscribe(async translate => {
        this.helpersService
          .showAlert(translate.Update, translate['Do you want to update the bank account?'])
          .then(async () => {
            const modal = await this.modalController.create({
              component: ManageAccountPage,
              componentProps: {
                'type': 'Update',
                ...this.savedAccountsFiltered[index]
              }
            });
            modal.onDidDismiss().then(() => {
              this.initialize();
            });
            return await modal.present();
          });
      })
    }
  }

  async onDelete(id, accountNumber, index) {
    this.translate.get(['Delete', 'Do you want to delete the beneficiary?', 'Cancel', 'Accept']).subscribe(async translate => {
      const alert = await this.alertController.create({
        header: translate['Delete'],
        message: translate['Do you want to delete the beneficiary?'],
        buttons: [
          translate['Cancel'],
          {
            text: translate['Accept'],
            handler: () => {
              this.deleteBeneficiarie(id, accountNumber, index);
            }
          }
        ]
      });

      await alert.present();
    });
  }

  public selectAccount(index: number, item: Beneficiarie) {
    console.log('Click Me', index, item);
    
    if(this.accountSelected.blocked) {
      this.helpersService.showErrorMessage('Origin account blocked', 'The origin account selected is blocked. Please select another to transfer to the selected beneficiary' )
      return;
    }
    if (this.accountSelected.accountNo == item.accountNumber) {
      // se agrega la validación para no hacer una transferencia a su misma cuenta seleccionada
     this.helpersService.showErrorMessage('Same account', 'You cannot transfer to the same account. Please select another to transfer to the selected beneficiary' )
     return;
   }
    const prevSelected = this.savedAccountsFiltered.find((account: Beneficiarie) => account.selected);
    if (prevSelected) {
      prevSelected.color = '';
      prevSelected.selected = false;
    }
    item.selected = true;
    item.color = 'light';
    this.beneficiarieSelected = item;
    this.isBeneficiarieSelected = true;

    // borro validadores del formulario de transferencia
    this.transferForm.clearValidators();
    // seteo validador de transfer amount
    this.transferForm.setValidators([CustomValidators.ValidateTransferAmountLimit('transferAmount', this.beneficiarieSelected.transferLimit)])
    // apago o prendo campo de RFC dependiendo el beneficiario seleccionado
    this.showRFC = this.beneficiarieSelected.accountNumber.length != 9 && this.beneficiarieSelected.accountNumber.length != 11;
    // agrego validador de rfc si corresponde
    if (this.showRFC) { 
      this.transferForm.controls['rfc'].setValidators([CustomValidators.ValidateRfcBoth]);
      this.toOnlyRegex('rfc', '[^0-9A-Za-z]');
    } else { this.transferForm.controls['rfc'].clearValidators() }
    // reseteo valores de formulario
    this.transferForm.reset();
    setTimeout(() => this.content.scrollToBottom(1000), 200);
  }

  async onMakeTransfer() {
    const form = { ...this.transferForm.value };
    if (form.transferAmount > this.accountSelected.accountBalance) {
      this.transferForm.controls['transferAmount'].setErrors({ transferAmountExceeded: true })
      return;
    }

    const date = new Date();

    if (
      date.getDay() === 0 || 
      date.getDay() === 6 || 
      date.getHours() < 9 || 
      (date.getHours() > 17 && this.beneficiarieSelected.accountNumber.length === 18) || 
      (date.getHours() === 17 && date.getMinutes() > 30 && this.beneficiarieSelected.accountNumber.length === 18) ||
      (date.getHours() > 20) ||
      (date.getHours() === 20 && date.getMinutes() > 0) 
    ) {
        this.helpersService.showAlert('Horario de Servicio', 'Los horarios de servicio para transferencias SPEI son de lunes a viernes de las 9:00 horas a las 17:30 horas. Los horarios de servicio para transferencias a cuentas de terceros son de lunes a viernes de las 9:00 horas a las 20:00 horas.');
        return;
    }

    this.translate.get(['Confirm transfer', 'Do you want to confirm the transfer?', 'Cancel', 'Accept']).subscribe(async translate => {
      const alert = await this.alertController.create({
        header: translate['Confirm transfer'],
        message: translate['Do you want to confirm the transfer?'],
        buttons: [
          translate['Cancel'],
          {
            text: translate['Accept'],
            handler: async () => {
              const modal = await this.modalController.create({
                component: AutomaticTokenPage
              });
              await modal.present();
              const { data } = await modal.onDidDismiss();
              
              if (!data.accept) return;
              this.makeTransfer();
            }
          }
        ]
      });

      await alert.present();
    });
  }

  private makeTransfer(): void {

    console.log("Transfering...");
    const form = { ...this.transferForm.value };

    let transfer: any;
    let accountClassificaction = 'TPT' || 'EXT';
    accountClassificaction = (this.beneficiarieSelected.accountNumber.length == 9 || this.beneficiarieSelected.accountNumber.length == 11) ? 'TPT' : 'EXT';
    if (accountClassificaction == 'TPT') {
      transfer = new accountTransferTPT();
      transfer.transferDate = this.helpersService.getFormattedDate();
      transfer.locale = environment.locale;
      transfer.dateFormat = environment.dateFormat;
      transfer.fromOfficeId = this.loginInfo.officeId;
      transfer.fromClientId = this.loginInfo.clientId;
      //TODO revisar aca porque SIEMPRE es 2
      transfer.fromAccountType = this.accountSelected.accountType;
      transfer.fromAccountId = this.accountSelected.id;
      transfer.note = form.concept;

      transfer.toOfficeId = this.beneficiarieSelected.officeId;
      transfer.toClientId = this.beneficiarieSelected.clientId;
      transfer.toAccountType = this.beneficiarieSelected.accountType.id;
      transfer.toAccountId = this.beneficiarieSelected.accountId;

      transfer.transferAmount = parseFloat(form.transferAmount.replace(/,/g, ''));
      transfer.transferDescription = form.transferDescription;


    } else if (accountClassificaction == 'EXT') {
      transfer = new accountTransferEXT();

      transfer.fromAccountId = this.accountSelected.id;
      transfer.accountNumber = this.beneficiarieSelected.accountNumber;
      transfer.transactionDate = this.helpersService.getFormattedDate();
      transfer.locale = environment.locale;
      transfer.dateFormat = environment.dateFormat;
      transfer.transactionAmount = parseFloat(form.transferAmount.replace(/,/g, ''));
      // concepto
      transfer.note = form.concept;
      // referencia
      transfer.routingCode = form.transferDescription;
      // rfc
      transfer.receiptNumber = form.rfc;
    } else {
      return;
    }

    console.log(JSON.stringify(transfer));
    //TODO mejorar cuando sepamos que se necesita
    let transferSuccess: any = {};
    transferSuccess.accountNumber = this.beneficiarieSelected.accountNumber;
    transferSuccess.clientName = this.beneficiarieSelected.clientName ? this.beneficiarieSelected.clientName : this.beneficiarieSelected.name;
    transferSuccess.transferAmount = form.transferAmount;
    transferSuccess.reference = form.transferDescription;
    transferSuccess.concept = form.concept;
    transferSuccess.rfc = form.rfc;
    transferSuccess.accountNoSelected = this.accountSelected.accountNo;
    transferSuccess.beneficiary = this.beneficiarieSelected.isOwnAccount ? null : transferSuccess.clientName;
    transferSuccess.ownerFullName = this.personalInfo.displayName;
    transferSuccess.destinationBank = accountClassificaction === 'EXT' && this.banks[this.beneficiarieSelected.bankEntity] && this.banks[this.beneficiarieSelected.bankEntity].description || null;
    transferSuccess.interbankNo = this.accountSelected.interbankNo;
    

    this.helpersService.presentLoading('Transfering...');

    this.clientsService.accountTransfers(transfer).toPromise()
      .then((response: any) => {
        console.log(response)
        transferSuccess.folio = response.resourceId;
        transferSuccess.transactionId = accountClassificaction === 'EXT' ? response.transactionId : null;
        transferSuccess.transactionDate = transfer.transferDate || transfer.transactionDate;
        this.openSuccessModal(transferSuccess);
      })
      .catch(err => {
        this.transferForm.reset();
        if (err.error.errors[0].userMessageGlobalisationCode === "error.msg.savings.account.transaction.max.amount.overcome") {
          this.helpersService.showErrorMessage('Limite Superado', 'Haz superado el importe máximo por día de transferencias. Para mayor información ve a la sección de Límites Transaccionales y verifica tus parametros.');
        } else if (err.error.errors[0].userMessageGlobalisationCode === "error.msg.savings.account.transaction.max.amount.operation") {
          this.helpersService.showErrorMessage('Limite Superado', 'Haz superado el importe máximo por transferencia. Para mayor información ve a la sección de Límites Transaccionales y verifica tus parametros.');
        } else if (err.error.errors[0].userMessageGlobalisationCode === "error.msg.savings.account.transaction.max.number.overcome") {
          this.helpersService.showErrorMessage('Limite Superado', 'Haz superado el número máximo de transacciones al día. Para mayor información ve a la sección de Límites Transaccionales y verifica tus parametros.');
        } else {
          this.helpersService.showErrorMessage('Transfer error', 'We could not proccess the transfer. Try later');
        }
      })
      .finally(() => this.helpersService.hideLoading())
  }

  private async openSuccessModal(transfer: any) {
    const modal = await this.modalController.create({
      component: TransferSuccessPage,
      componentProps: {
        'type': 'Create',
        ...transfer,
      }
    });
    modal.onDidDismiss().then(() => {
      this.beneficiarieSelected = null;
      this.isBeneficiarieSelected = false;
      this.resetBeneficiariesList();
      this.initialize();
      //setTimeout(() => this.content.scrollToTop(1000), 200);
    });

    return await modal.present();
  }

  // traemos los accounts del cliente
  private async getAccounts(): Promise<any> {
    return this.translate.get(['Own Account', 'Own Loan']).toPromise().then(async translate => {
      return this.clientsService.getSavingsAccounts()
        .then((savings: any) => {
          this.accounts = [];

          savings.forEach(element => {
            let account: CardAccount = new CardAccount(element.id, element.accountNo, element.availableBalance, this.personalInfo.displayName, 2, element.subStatus.block, element.interbankNo);
            this.accounts.push(account);

            let ownBeneficiarieAccount: Beneficiarie = new Beneficiarie(this.personalInfo.displayName, translate['Own Account'], element.id,
              element.accountNo, 2, this.loginInfo.clientId, this.personalInfo.displayName, this.personalInfo.officeId, this.personalInfo.officeName);
            if (savings.length > 1) { // solo agrega las cuentas propias a mostrar si tiene mas de una cuenta
                this.savedAccounts.push(ownBeneficiarieAccount);
                }
            this.myAccounts.push(ownBeneficiarieAccount);
            });

          let accountNumberDefault = this.accounts[0].accountNo;

          this.resetBeneficiariesList(accountNumberDefault);
          return this.accounts;

        });
    })
  }


  public deleteBeneficiarie(id: string, accountNumber: string, index: number): void {
    this.helpersService.presentLoading('Deleting beneficiary...');
    let accountClassificaction = 'TPT' || 'EXT';
    accountClassificaction = (accountNumber.length == 9 || accountNumber.length == 11) ? 'TPT' : 'EXT';
    let promise: any;
    if (accountClassificaction == 'TPT') {
      promise = this.clientsService.deleteBeneficiarieTPT(id)
    }
    if (accountClassificaction == 'EXT') {
      promise = this.clientsService.deleteBeneficiarieEXT(id)
    }
    promise.toPromise().then((response: any) => {
      this.savedAccountsFiltered = this.savedAccounts;
      this.savedAccountsFiltered.splice(index, 1);
    })
      .catch(err => {
        console.log(err);
        this.helpersService.showErrorMessage();
      })
      .finally(() => this.helpersService.hideLoading())
  }

  public onChangeText(text: string) {
    this.isBeneficiarieSelected = false;
    this.beneficiarieSelected = null;
    // filtramos la cuenta seleccionada
    this.savedAccountsFiltered = this.savedAccounts.filter(u => (u.isOwnAccount && u.accountNumber !== this.accountSelected.accountNo) || !u.isOwnAccount);
    // filtramos por el texto introducido
    this.savedAccountsFiltered = this.savedAccountsFiltered.filter(function (str) { return str.name.toLowerCase().indexOf(text.toLowerCase()) !== -1 || str.alias.toLowerCase().indexOf(text.toLowerCase()) !== -1; });
  }

  public onChangeAccount(param: CardAccount) {
    // seteamos nueva cuenta
    this.accountSelected = param;
    this.resetBeneficiariesList(this.accountSelected.accountNo);
  }

  public onInitCardAccount(param: CardAccount) {
    // seteamos nueva cuenta
    this.accountSelected = param;
  }

  private resetBeneficiariesList(accountNumber?: string) {
    // reseteamos el filtro
    this.savedAccountsFiltered = this.savedAccounts;
    this.savedAccountsFiltered = this.savedAccounts.filter(u => (u.isOwnAccount && u.accountNumber != accountNumber) || !u.isOwnAccount);
    this.beneficiarieSearch = "";
  }

}
