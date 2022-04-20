import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetEmailPageRoutingModule } from './get-email-routing.module';

import { GetEmailPage } from './get-email.page';
import { HeaderModule } from '@components/header/header.module';
import { FooterModule } from '@components/footer/footer.module';
import { AutomaticTokenPageModule } from '@pages/automatic-token/automatic-token.module';
import { TranslateModule } from '@ngx-translate/core';
import { InputErrorModule } from '@components/input-error/input-error.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    GetEmailPageRoutingModule,
    HeaderModule,
    FooterModule,
    AutomaticTokenPageModule,
    TranslateModule,
    
    InputErrorModule
  ],
  declarations: [GetEmailPage]
})
export class GetEmailPageModule {}
