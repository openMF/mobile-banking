import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayOrderPageRoutingModule } from './pay-order-routing.module';

import { PayOrderPage } from './pay-order.page';
import { HeaderModule } from '@components/header/header.module';
import { FooterModule } from '@components/footer/footer.module';
import { NgxBarcodeModule } from 'ngx-barcode';
import { TranslateModule } from '@ngx-translate/core';
import { RoundingButtonModule } from '@components/rounding-button/rounding-button.module';
import { InputErrorModule } from '@components/input-error/input-error.module';
import { WrapperModule } from '@components/wrapper/wrapper.module';
import { MoneyPipeModule } from '@pipes/money/money.module';
import { AutomaticTokenPageModule } from '@pages/automatic-token/automatic-token.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayOrderPageRoutingModule,
    ReactiveFormsModule,
    HeaderModule,
    FooterModule,
    NgxBarcodeModule,
    TranslateModule,
    RoundingButtonModule,
    InputErrorModule,
    WrapperModule,
    MoneyPipeModule,
    AutomaticTokenPageModule
  ],
  declarations: [PayOrderPage]
})
export class PayOrderPageModule {}
