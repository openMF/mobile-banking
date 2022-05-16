import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollectCodiQrPageRoutingModule } from './collect-codi-qr-routing.module';

import { CollectCodiQrPage } from './collect-codi-qr.page';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { RoundingButtonModule } from '@components/rounding-button/rounding-button.module';
import { MoneyFormatModule } from '@components/money-format/money-format.module';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderModule } from '@components/header/header.module';
import { FooterModule } from '@components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollectCodiQrPageRoutingModule,
    NgxQRCodeModule,
    RoundingButtonModule,
    MoneyFormatModule,
    TranslateModule,
    HeaderModule,
    FooterModule
  ],
  declarations: [CollectCodiQrPage]
})
export class CollectCodiQrPageModule {}
