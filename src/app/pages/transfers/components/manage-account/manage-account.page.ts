import { Component, OnInit, ɵConsole } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ClientsService } from '@services/clients/clients.service';
import { PersonalInfo } from '@globals/interfaces/personal-info';
import * as CustomValidators from '@globals/custom.validator';
import { UserService } from '@services/user/user.service';
import { Beneficiarie } from '@globals/interfaces/beneficiarie';
import { TranslateService } from '@ngx-translate/core';
import { HelpersService } from '@services/helpers/helpers.service';
import { Storage } from '@ionic/storage';
import { AutomaticTokenPage } from '@pages/automatic-token/automatic-token.page';

export interface Bank {
  id: number;
  name: string;
  position: number;
  score: number;
  description: string;
  active: boolean;
  mandatory: boolean;
}

export interface BeneficiaryAccountType {
  id: number;
  name: string;
  position: number;
  score: number;
  description: string;
  active: boolean;
  mandatory: boolean;
}

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.page.html',
  styleUrls: ['./manage-account.page.scss'],
})
export class ManageAccountPage implements OnInit {

  public type: 'Create' | 'Update';

  public form: FormGroup;

  public personalInfo: PersonalInfo;

  public banks: Bank[] = [];

  public searchButtonEnabled: boolean = false;

  private officeNameFound: string;
  private accountTypeFound: number;

  public flag: boolean = false;

  public beneficiaryAccountTypes: BeneficiaryAccountType[] = [];

  public accountTypeOption: any;

  public bankIdOption: any;

  public cancelText: string;

  public id: number;

  constructor(
    protected modalController: ModalController,
    protected activatedRoute: ActivatedRoute,
    protected navParams: NavParams,
    protected formBuilder: FormBuilder,
    protected http: HttpClient,
    private clientsService: ClientsService,
    private userService: UserService,
    private translateService: TranslateService,
    private helpersService: HelpersService,
    private storage: Storage
  ) {
  }

  ngOnInit() {
    console.log(this.navParams.data);
    const { type } = this.navParams.data;

    this.type = type;
    this.initializeApp();
  }

  private initializeApp() {

    this.translateService.get(['Kind of product', 'Bank / Institution', 'Cancel']).subscribe(translate => {
      console.log(translate);

      this.accountTypeOption = { header: translate['Kind of product'] };
      this.bankIdOption = { header: translate['Bank / Institution'] };
      this.cancelText = translate['Cancel'];

    })

    const { id, name, alias, accountNumber, transferLimit, officeName, accountType, bankEntity } = this.navParams.data;

    this.id = id;

    this.form = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      alias: [''],
      accountType: ['', Validators.required],
      accountNumber: ['', Validators.compose([
        Validators.required,
        // Validators.min(9),
        //TODO por algun motivo este validador anda mal
        // Validators.max(19),
        CustomValidators.ValidateAccountNumberBeneficiaries
      ])],
      transferLimit: ['', Validators.required],

      bankId: ['', Validators.required]
    }, {
      validator: [CustomValidators.ValidateNameBeneficiary('name', this.userService.beneficiaries, this.id),
      CustomValidators.ValidateAccountNumberBeneficiaryExist('accountNumber', this.userService.beneficiaries),
      CustomValidators.ValidateOwnAccountNumberExist('accountNumber', this.userService.myAccounts)
    ]
    });

    this.form.controls['accountType'].disable();
    this.form.controls['bankId'].disable();
    this.form.controls['name'].disable();

    //this.helpersService.presentLoading();

    Promise.all([
      this.clientsService.getPersonalInfo(),
      this.clientsService.getBanks().toPromise(),
      this.clientsService.getBeneficiaryAccountTypes().toPromise()
    ])
      .then((response: any[]) => {
        // Cargamos datos del usuario
        this.personalInfo = response[0];
        // Cargamos catalogo de bancos
        this.banks = response[1];
        //Cargamos catalogo de beneficiary account types
        this.beneficiaryAccountTypes = response[2];


        this.storage.get('globals').then( globals => {
          if (globals && globals.transferLimit) {
            this.form.setValidators([CustomValidators.ValidateNameBeneficiary('name', this.userService.beneficiaries, this.id),
            CustomValidators.ValidateAccountNumberBeneficiaryExist('accountNumber', this.userService.beneficiaries),
            CustomValidators.ValidateOwnAccountNumberExist('accountNumber', this.userService.myAccounts),
            CustomValidators.ValidateTransferAmountLimit('transferLimit', parseInt(globals.transferLimit.description))
          ]);
          }
        } );

        if (this.type === 'Create') {
          return;
        }

        this.form.patchValue({
          id: id,
          name: name,
          alias: alias,
          accountNumber: accountNumber.replace(/ /gi, ''),
          transferLimit: transferLimit,
          bankId: bankEntity
        });

        this.officeNameFound = officeName;
        this.accountTypeFound = accountType.id;

        this.form.controls['name'].enable();
        this.form.controls['accountNumber'].disable();
        this.form.controls['alias'].disable();
        this.searchButtonEnabled = false;

        this.form.setValidators([CustomValidators.ValidateNameBeneficiary('name', this.userService.beneficiaries, this.id)])
      })
      .catch(err => {
        console.log(err);
        this.helpersService.showErrorMessage();
      })
      .finally(() => {
        this.flag = true
        //this.helpersService.hideLoading();
      })

    // Si el valor cambia => configuramos las variables necesarias
    this.form.get("accountNumber").valueChanges.subscribe((x: string) => {
      this.evaluateAccountType(x);
      this.evaluateBank(x);
    })
  }

  async evaluateAccountType(x: string) {
    // dinamismo para poner en account type en base al largo seteado en el description
    const beneficiaryAccountType = this.beneficiaryAccountTypes.filter(u => u.score == x.length && u.active);
    if (beneficiaryAccountType.length == 1) {
      this.form.controls['accountType'].setValue(beneficiaryAccountType[0].id.toString(), { onlySelf: true });
    } else {
      this.form.controls['accountType'].reset();
    }
  }

  async evaluateBank(x: string) {
    let possibleBank = x.substring(0, 3);
    const possibleBanks = this.banks.filter(u => u.name == possibleBank);
    if (x.length == 11) {
      this.searchButtonEnabled = true;
      // La clave de BanBi es 166
      const possibleBanks = this.banks.filter(u => u.name == '166');
      return possibleBanks.length == 1 ? this.form.controls['bankId'].setValue(possibleBanks[0].id.toString(), { onlySelf: true }) : this.form.controls['accountNumber'].setErrors({ accountNumber: true });
    // } else if (x.length == 16) {
    //   this.form.controls['bankId'].enable();
    //   this.form.controls['name'].enable();
    //   this.searchButtonEnabled = false;
    } else if (x.length == 18) {
      if (x.substring(0, 3) == "166") {
        this.searchButtonEnabled = true;
        this.form.controls['name'].disable();
      } else {
        this.searchButtonEnabled = false;
        this.form.controls['name'].enable();
      }
      const possibleBanks = this.banks.filter(u => u.name.padStart(3, "0") == x.substring(0, 3));
      return possibleBanks.length == 1 ? this.form.controls['bankId'].setValue(possibleBanks[0].id.toString(), { onlySelf: true }) : this.form.controls['accountNumber'].setErrors({ accountNumber: true });
    } else {
      this.form.controls['name'].disable();
      this.form.controls['name'].reset();

      this.form.controls['bankId'].disable();
      this.form.controls['bankId'].reset();
      this.searchButtonEnabled = false;
    }
  }

  public dismissModal() {
    this.modalController.dismiss();
  }

  toOnlyRegex(key: string, regex: string) {
    const inputName = this.form.get(key);
    inputName.valueChanges.subscribe(value => inputName.setValue( value.toUpperCase().replace(new RegExp(regex, 'g'), ""), { emitEvent: false }));
  }

  async search() {
    const form = { ...this.form.value };

    let accountNumber: string = form.accountNumber;
    let parametro = accountNumber;
    // si es una cuenta del banco 166 que es bienestar, borramos los primeros 6 digitos y el último para obtener la cuenta a ir al backend a buscar información
    if (accountNumber.length == 18 && accountNumber.substring(0, 3) == "166") {
      parametro = accountNumber.substring(6).substring(0, accountNumber.substring(6).length - 1);
    }

    this.clientsService.searchAccount(parametro)
      .toPromise()
      .then((res: Beneficiarie[]) => {
        console.log(res);
        if (res.length == 1) {
          this.officeNameFound = res[0].officeName;
          this.accountTypeFound = res[0].accountType.id;
          this.form.controls['name'].setValue(res[0].clientName);
          this.form.controls['name'].markAsTouched();
          this.form.controls['name'].enable();
        } else {
          this.form.controls['accountNumber'].setErrors({ accountNotFound: true })
        }
      })
      .catch(err => {
        console.log(err);
        this.helpersService.showErrorMessage();
      })
      .finally(() => this.helpersService.hideLoading())
  }

  async submit() {

    const form = { ...this.form.getRawValue() };

    if (this.form.invalid) { return }

    const modal = await this.modalController.create({
      component: AutomaticTokenPage
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    
    if (!data.accept) return;

    let accountClassificaction = 'TPT' || 'EXT';
    accountClassificaction = (form.accountNumber.length == 11 || form.accountNumber.substring(0, 3) == "166") ? 'TPT' : 'EXT';
    let promise: any;
    let beneficiary: any;
    const message = this.type == 'Create' ? "Creating beneficiary..." : "Updating beneficiary..."
    this.helpersService.presentLoading(message);

    if (this.type == 'Create' && accountClassificaction == 'TPT') {
      // aca metemos un beneficiario TPT a mifos
      beneficiary = {
        "locale": "es",
        "name": form.name,
        "alias": form.alias,
        // como es TPT (porque tiene 11 digitos o, comienza con 166 y es de 18 digitos) hacemos substring para sacar la cuenta
        "accountNumber": form.accountNumber.length == 11 ? form.accountNumber : form.accountNumber.substring(6).substring(0, form.accountNumber.substring(6).length - 1),
        "officeName": this.officeNameFound,
        "accountType": this.accountTypeFound,
        "transferLimit": form.transferLimit
      }

      promise = this.clientsService.postBeneficiariesTPT(beneficiary);
    }

    if (this.type == 'Update' && accountClassificaction == 'TPT') {
      beneficiary = {
        "name": form.name,
        // TODO chequear si el alias puede ser updateable
        // "alias": form.alias,
        "transferLimit": form.transferLimit
      }
      promise = this.clientsService.putBeneficiariesTPT(beneficiary, form.id);
    }

    if (this.type == 'Create' && accountClassificaction == 'EXT') {
      // aca metemos un beneficiario TPT a mifos
      beneficiary = {
        "locale": "es",
        "name": form.name,
        "alias": form.alias,
        "accountNumber": form.accountNumber,
        "bankEntity": form.bankId,
        //siempre saving
        "accountType": 2,
        "transferLimit": form.transferLimit
      }
      promise = this.clientsService.postBeneficiariesEXT(beneficiary);
    }

    if (this.type == 'Update' && accountClassificaction == 'EXT') {
      // aca metemos un beneficiario TPT a mifos
      beneficiary = {
        "name": form.name,
        // TODO chequear si el alias puede ser updateable
        //"alias": form.alias,
        "transferLimit": form.transferLimit
      }
      console.log(JSON.stringify(beneficiary));
      promise = this.clientsService.putBeneficiariesEXT(beneficiary, form.id);
    }

    promise.toPromise().then((res: any) => {
      console.log(res);
      beneficiary.id = res.resourceId;
      this.dismissModal();
    })
      .catch(err => {
        if (err.status === 504 || err.status === 0) {
          
        } else {
          this.helpersService.showErrorMessage();
        }
      })
      .finally(() => this.helpersService.hideLoading())
  }
}

