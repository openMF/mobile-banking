import { Component, OnInit } from '@angular/core';
import { IonSlides, ModalController, AlertController, MenuController } from '@ionic/angular';
import { MovementsPage } from './components/movements/movements.page';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Router } from '@angular/router';
import { ClientsService } from '@services/clients/clients.service';
import { PersonalInfo } from '@globals/interfaces/personal-info';
import { CardAccount } from '@globals/classes/card-account';
import { LoginInfo } from '@globals/interfaces/login-info';
import { HelpersService } from '@services/helpers/helpers.service';
import { AuthenticationService } from '@services/user/authentication.service';
import { environment } from '@env';
import { CodesService } from '@services/catalogs/codes.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  public tabIdex = 0;

  public color = 'success';

  public accounts: any = [
    // {
    //   account: '0009878554',
    //   balance: '8650.89',
    //   clientName: 'Leona Vicario Fernández',
    //   cardNumber: ''
    // },
    // {
    //   account: '0003893021',
    //   balance: '12400.45',
    //   clientName: 'Leona Vicario Fernández',
    //   cardNumber: ''
    // }
  ];

  private accountSelected: CardAccount;
  private personalInfo: PersonalInfo;
  private globalConfig: any;
  public isLoading: boolean = false;

  public loginInfo: LoginInfo;

  constructor(
    private modalController: ModalController,
    private barcodeScanner: BarcodeScanner,
    private androidPermissions: AndroidPermissions,
    private router: Router,
    private alertController: AlertController,
    private menuCtrl: MenuController,
    private clientsService: ClientsService,
    private helpersService: HelpersService,
    private authentication: AuthenticationService,
    private codesService: CodesService,
    private storage: Storage
  ) {
    this.checkPermissions();

  }

  ngOnInit() {
    this.menuCtrl.enable(true);
    if (environment.production) {
      this.authentication.startIdleTimer();
    }
  }

  ionViewDidEnter() {
    this.initialize(null);
  }

  protected checkPermissions() {
    this.androidPermissions
      .checkPermission(this.androidPermissions
        .PERMISSION.WRITE_EXTERNAL_STORAGE)
      .then((result) => {
        console.log('Has permission?', result.hasPermission);
      }, (err) => {
        this.androidPermissions
          .requestPermission(this.androidPermissions
            .PERMISSION.WRITE_EXTERNAL_STORAGE);
      });
  }

  public slideChanged(slides: IonSlides) {
    slides.getActiveIndex().then((index: number) => {
      console.log(index);
      this.tabIdex = index;
    });
  }


  public scannerQRCode() {

    let payload: any;

    this.barcodeScanner.scan({
      // preferFrontCamera : true, // iOS and Android
      // showFlipCameraButton : true, // iOS and Android
      showTorchButton: true, // iOS and Android
      // torchOn: true, // Android, launch with the torch switched on (if available)
      // prompt : "Place a barcode inside the scan area", // Android
      resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      formats: 'QR_CODE', // default: all but PDF_417 and RSS_EXPANDED
      // orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
      // disableAnimations : true, // iOS
      disableSuccessBeep: true // iOS and Android
    }).then(barcodeData => {
      console.log('Barcode data', barcodeData);
      payload = JSON.stringify(barcodeData);
    }).catch(err => {
      console.log('Error', err);
      payload = JSON.stringify({ error: 'No se pudo leer correctamente el código' });
      // this.presentAlert();

    }).finally(() => {
      this.router.navigate(['pay-codi', payload]);
    });

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¡Cuidado!',
      subHeader: 'La cámara del dispositivo no esta disponible',
      message: 'No se pudo leer correctamente el código QR.',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]

    });

    await alert.present();
  }

  async presentModal() {
    this.color = 'secondary';
    const modal = await this.modalController.create({
      component: MovementsPage,
      componentProps: {
        accountNumber: this.accountSelected.id
      }
    });
    return await modal.present();
  }

  public initialize(event: any) {

    if (!event) {
      this.isLoading = true;
      //this.helpersService.presentLoading();
    }

    this.clientsService.getPersonalInfo()
      .then((data: PersonalInfo) => {
        console.log('<here at dashboard Personal Info>');
        console.log(data);
        this.personalInfo = data;
        return this.storage.get('globals');
      })
      .then((data: any) => {
        console.log(data);
        this.globalConfig = data;
        console.log('<here at dashboard get Global Config>');
        return this.clientsService.getLoginInfo();
      })
      .then(async (data: LoginInfo) => {
        this.loginInfo = data;
        console.log(data);
        console.log('<here at dashboard get Accounts>');
        await this.getAccounts();
        return data;
      })
      .catch(err => {
        console.log('err', err);
        this.router.navigate(['/login']);
        this.helpersService.showErrorMessage();
        throw err;
      })
      .finally(() => {
        if (event) {
          event.target.complete();
        } else {
          this.isLoading = false;
          //this.helpersService.hideLoading();
        }
      });

  }

  private getAccounts(): Promise<any> {
    return this.clientsService.getSavingsAccounts().then( savings => {
      this.accounts = [];
      if (this.globalConfig.showSavingAccounts.description) {
        savings.forEach(element => {
          console.log(element);

          const account: CardAccount = new CardAccount(element.id, element.accountNo, element.availableBalance, this.personalInfo.displayName, 2, element.subStatus.block);
          this.accounts.push(account);
        });
      }
    } );
  }

  // private getAccounts(): Promise<any> {
  //   return this.clientsService.getAccounts(this.loginInfo.clientId).toPromise()
  //     .then((response: any) => {
  //       this.accounts = [];
  //       if (response.savingsAccounts.length > 0 || response.loanAccounts.length) {

  //         if (JSON.parse(this.globalConfig.showSavingAccounts.description)) {
  //           let savings = response.savingsAccounts;
  //           savings.forEach(element => {
  //             // si es savings, es 2
  //             if (element.status.active) {
  //               let account: CardAccount = new CardAccount(element.id, element.accountNo, element.accountBalance, this.personalInfo.displayName, 2, element.subStatus.block);
  //               this.accounts.push(account);
  //             }
  //           })
  //         }
  //         if (JSON.parse(this.globalConfig.showLoanAccounts.description)) {
  //           let loans = response.loanAccounts;
  //           loans.forEach(element => {
  //             // si es loans, es 1
  //             if (element.status.active) {
  //               //TODO no sabemos que variable poner si esta blockeado o no - por ahora es false
  //               let account: CardAccount = new CardAccount(element.id, element.accountNo, element.accountBalance, this.personalInfo.displayName, 1, false);
  //               this.accounts.push(account);
  //             }
  //           })
  //         }
  //       }
  //       return this.accounts;
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       throw err;
  //     })
  // }

  public onChangeAccount(param: CardAccount) {
    this.accountSelected = param;
  }

  public onInitCardAccount(param: CardAccount) {
    // seteamos nueva cuenta
    this.accountSelected = param;
  }
}
