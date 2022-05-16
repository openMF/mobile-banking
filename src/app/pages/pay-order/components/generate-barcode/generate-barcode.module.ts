import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerateBarcodePageRoutingModule } from './generate-barcode-routing.module';

import { GenerateBarcodePage } from './generate-barcode.page';
import { HeaderModule } from '@components/header/header.module';
import { FooterModule } from '@components/footer/footer.module';
import { RoundingButtonModule } from '@components/rounding-button/rounding-button.module';
import { MoneyFormatModule } from '@components/money-format/money-format.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxBarcodeModule } from 'ngx-barcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerateBarcodePageRoutingModule,
    HeaderModule,
    FooterModule,
    RoundingButtonModule,
    MoneyFormatModule,
    TranslateModule,
    NgxBarcodeModule
  ],
  declarations: [GenerateBarcodePage]
})
export class GenerateBarcodePageModule {}
