import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoneyPipe } from './money.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ MoneyPipe ],
  exports: [ MoneyPipe ]
})
export class MoneyPipeModule { }
