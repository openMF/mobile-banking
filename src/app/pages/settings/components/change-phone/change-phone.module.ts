import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangePhonePageRoutingModule } from './change-phone-routing.module';
import { InputErrorModule } from '@components/input-error/input-error.module';

import { ChangePhonePage } from './change-phone.page';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderModule } from '@components/header/header.module';
import { FooterModule } from '@components/footer/footer.module';
import { AutomaticTokenPageModule } from '@pages/automatic-token/automatic-token.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ChangePhonePageRoutingModule,
    InputErrorModule,
    TranslateModule,
    HeaderModule,
    FooterModule,
    AutomaticTokenPageModule
  ],
  declarations: [ChangePhonePage]
})
export class ChangePhonePageModule {}
