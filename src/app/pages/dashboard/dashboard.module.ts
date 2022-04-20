import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { MovementsPageModule } from './components/movements/movements.module';
import { CardAccountModule } from '@components/card-account/card-account.module';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderModule } from '@components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    MovementsPageModule,
    CardAccountModule,
    NgxQRCodeModule,
    TranslateModule,
    HeaderModule
  ],
  declarations: [DashboardPage],
  providers: [BarcodeScanner]
})
export class DashboardPageModule { }
