import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayOrdersPageRoutingModule } from './pay-orders-routing.module';

import { PayOrdersPage } from './pay-orders.page';
import { HeaderModule } from '@components/header/header.module';
import { FooterModule } from '@components/footer/footer.module';
import { TranslateModule } from '@ngx-translate/core';
import { MoneyPipeModule } from '@pipes/money/money.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayOrdersPageRoutingModule,
    HeaderModule,
    FooterModule,
    TranslateModule,
    MoneyPipeModule
  ],
  declarations: [PayOrdersPage]
})
export class PayOrdersPageModule {}
