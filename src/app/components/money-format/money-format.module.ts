import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MoneyFormatComponent } from './money-format.component';

@NgModule({
  declarations: [MoneyFormatComponent],
  providers: [CurrencyPipe],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [MoneyFormatComponent]
})
export class MoneyFormatModule { }
