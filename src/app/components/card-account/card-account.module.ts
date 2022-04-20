import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CardAccountComponent } from './card-account.component';
import { IonicModule } from '@ionic/angular';
import { MoneyFormatModule } from '@components/money-format/money-format.module';
import { TranslateModule } from '@ngx-translate/core';
import { MoneyPipeModule } from '@pipes/money/money.module';

@NgModule({
  declarations: [CardAccountComponent],
  imports: [
    CommonModule,
    IonicModule,
    MoneyFormatModule,
    TranslateModule,
    MoneyPipeModule
  ],
  exports: [CardAccountComponent],
  providers: [CurrencyPipe]
})
export class CardAccountModule { }
