import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionLimitPageRoutingModule } from './transaction-limit-routing.module';

import { TransactionLimitPage } from './transaction-limit.page';
import { HeaderModule } from '@components/header/header.module';
import { FooterModule } from '@components/footer/footer.module';
import { MoneyPipeModule } from '@pipes/money/money.module';
import { AutomaticTokenPageModule } from '@pages/automatic-token/automatic-token.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionLimitPageRoutingModule,
    HeaderModule,
    FooterModule,
    ReactiveFormsModule,
    MoneyPipeModule,
    AutomaticTokenPageModule
  ],
  declarations: [TransactionLimitPage]
})
export class TransactionLimitPageModule {}
