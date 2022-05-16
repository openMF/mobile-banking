import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodiPageRoutingModule } from './codi-routing.module';

import { CodiPage } from './codi.page';

import { NgxQRCodeModule } from 'ngx-qrcode2';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    TranslateModule ,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CodiPageRoutingModule,
    NgxQRCodeModule
  ],
  declarations: [CodiPage]
})
export class CodiPageModule {}
