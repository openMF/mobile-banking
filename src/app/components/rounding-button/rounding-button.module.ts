import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RoundingButtonComponent } from './rounding-button.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [RoundingButtonComponent],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    TranslateModule
  ],
  exports: [RoundingButtonComponent]
})
export class RoundingButtonModule { }
