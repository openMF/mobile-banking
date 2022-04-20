import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationPageRoutingModule } from './registration-routing.module';

import { RegistrationPage } from './registration.page';
import { TranslateModule } from '@ngx-translate/core';
import { InputErrorModule } from '@components/input-error/input-error.module';
import { HeaderModule } from '@components/header/header.module';
import { FooterModule } from '@components/footer/footer.module';
// import { NgxFaceApiJsModule } from 'ngx-face-api-js';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegistrationPageRoutingModule,
    InputErrorModule,
    HeaderModule,
    FooterModule
    // NgxFaceApiJsModule.forRoot({ modelsUrl: 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights',})
  ],
  declarations: [RegistrationPage]
})
export class RegistrationPageModule {}
