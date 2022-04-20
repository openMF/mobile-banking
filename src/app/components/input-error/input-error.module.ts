import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { InputErrorComponent } from './input-error.component';

@NgModule({
  declarations: [InputErrorComponent],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule
  ],
  exports: [InputErrorComponent],
  providers: [CurrencyPipe]
})
export class InputErrorModule { }
