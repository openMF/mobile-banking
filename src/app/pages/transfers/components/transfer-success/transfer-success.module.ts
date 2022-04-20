import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransferSuccessPageRoutingModule } from './transfer-success-routing.module';

import { TransferSuccessPage } from './transfer-success.page';
import { TranslateModule } from '@ngx-translate/core';
import { InputErrorModule } from '@components/input-error/input-error.module';
import { HeaderModule } from '@components/header/header.module';
import { FooterModule } from '@components/footer/footer.module';
import { MoneyFormatModule } from '@components/money-format/money-format.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransferSuccessPageRoutingModule,
    IonicModule,
    TranslateModule,
    ReactiveFormsModule,
    InputErrorModule,
    HeaderModule,
    FooterModule,
    MoneyFormatModule
  ],
  declarations: [TransferSuccessPage],
  entryComponents: [TransferSuccessPage]
})
export class TransferSuccessPageModule {}
