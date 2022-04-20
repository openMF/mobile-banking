import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { WrapperComponent } from './wrapper.component';

@NgModule({
  declarations: [WrapperComponent],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [WrapperComponent]
})
export class WrapperModule { }
