import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SavingsaccountsService } from '@services/savingsaccounts/savingsaccounts.service';
import { HelpersService } from '@services/helpers/helpers.service';
import { stat } from 'fs';
import { ClientsService } from '@services/clients/clients.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pay-orders',
  templateUrl: './pay-orders.page.html',
  styleUrls: ['./pay-orders.page.scss'],
})
export class PayOrdersPage implements OnInit {

  selectOption: any;

  cancelText: string;

  payOrderStatus: number = 0;

  payOrders: any[] = [];

  loadingData: boolean = false;

  payOrdersTypes: any[] = [
    {
      key: 0, 
      value: 'All'
    },
    {
      key: 'ACTIVE', 
      value: 'Receivable'
    },
    {
      key: 'PAID', 
      value: 'Paid'
    },
    {
      key: 'CANCELED', 
      value: 'Canceled'
    }
  ]

  constructor(
      private translateService: TranslateService,
      private savingsAccService: SavingsaccountsService,
      private translate: TranslateService,
      private helpersService: HelpersService,
      private clientsService: ClientsService,
      private localNotifications: LocalNotifications,
      private router: Router
    ) { }

  ngOnInit() {
    this.translateService.get(['Cancel']).subscribe(translate => {
      console.log(translate);

      this.selectOption = { header: 'Estatus' };
      this.cancelText = translate['Cancel'];

    });

    this.getSavingAccounts();

  //   this.localNotifications.schedule({
  //     text: 'Se acaba de cobrar una Orden de Pago',
  //     trigger: {at: new Date(new Date().getTime() + 5000)},
  //     led: 'FF0000',
  //     sound: null
  //  });

  }

  public digitVerifier(code: string): string {

    let sumImpar: number = 0;
    let sumPar: number = 0;
    const len = code.length;
     
    if (len > 12) {
      code = code.substring(0, 12);
    } else if (len < 12) {
      return code;
    }
    
    let arrayCode: string[] = code.split('');

    for (const key in  arrayCode) {
      if (parseInt(key) % 2) {
        sumImpar += parseInt( arrayCode[key] );
      } else {
        sumPar += parseInt( arrayCode[key] );
      }
    }

    const sumResult = sumPar + (sumImpar * 3);
    let aux = sumResult/10;
    let calDecimal = aux > parseInt(aux+'') ? ((parseInt(aux+'') + 1) * 10) : sumResult;
    
    return code + (calDecimal - sumResult);
    
  }


  get filterPayOrders(): any[] {
    if (this.payOrderStatus === 0) {
      return this.payOrders.sort( (a, b) => {
          return (new Date(b.createdOn)).getTime() - (new Date(a.createdOn)).getTime();
      } );
    }
    return this.payOrders.filter( item => item.status === this.payOrderStatus ).sort( (a, b) => {
          return (new Date(b.createdOn)).getTime() - (new Date(a.createdOn)).getTime();
      } );
  }

  public goToBarcode(item: any) {
    if (item.status !== 'ACTIVE') return;

    this.router.navigate(['/pay-order', 'generate-barcode'], {
      queryParams: {
        transactionAmount: item.amount, 
        code: item.code, 
        routingCode: item.routingCode || '',
        showBackButton: 'true'
      }
    });
    
  }

  public getConfig(status: string): any {
    let color: string;
    let statusText: string;

    switch(status) {
      case 'ACTIVE':
        statusText = 'Receivable';
        color = 'green';
        break;
      case 'PAID':
        statusText = 'Paid';
        color = '#ffc409';
        break;
      case 'CANCELED':
        statusText = 'Canceled';
        color = 'red';
        break;
      default: 
        statusText = 'Undefined';
        color = 'gray';
        break;

    }
    return {color, statusText};
  }

  public cancelPayOrder(item: any) { 

    this.translate.get([
      'Cancel', 
      'Do you want to cancel the payment order?'
    ]).subscribe( (resp: any) => {
      this.helpersService
        .showAlert(resp.Reject, resp['Do you want to cancel the payment order?'])
        .then( () => {

          const payOrder = {...item};
          const accountId = payOrder.accountId;
          delete payOrder.accountId;
          this.helpersService.presentLoading();

          this.savingsAccService.cancelPayOrder(accountId, payOrder).toPromise().then( response => {
            console.log(response);
          } )
          .finally( () => {
            this.getSavingAccounts();
            this.helpersService.hideLoading();
          } );
        } );
    } );
  }


  public getSavingAccounts() {
    this.loadingData = true;
    this.payOrders.length = 0;

    this.clientsService.getSavingsAccounts(false).then( savings => {

      const arrayPoms = [];

      for (const key in savings) {
        arrayPoms.push(
          this.savingsAccService.getPayOrders(savings[key].id).toPromise()
        );
      }

      return Promise.all(arrayPoms)
        .then( (proms: any[]) => {
          for (const key in proms) {
            this.payOrders = [...this.payOrders, ...proms[key]];
          }
          console.log(this.payOrders);
          
        } );
    } ).finally( () => this.loadingData = false )
    
  }

}
