import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeEmailPageRoutingModule } from './change-email-routing.module';

import { ChangeEmailPage } from './change-email.page';
import { InputErrorModule } from '@components/input-error/input-error.module';
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
    TranslateModule,
    InputErrorModule,
    ChangeEmailPageRoutingModule,
    HeaderModule,
    FooterModule,
    AutomaticTokenPageModule
  ],
  declarations: [ChangeEmailPage]
})
export class ChangeEmailPageModule {}
