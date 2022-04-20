import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnterCodePageRoutingModule } from './enter-code-routing.module';

import { EnterCodePage } from './enter-code.page';
import { TranslateModule } from '@ngx-translate/core';
import { AutomaticTokenPageModule } from '@pages/automatic-token/automatic-token.module';
import { FooterModule } from '@components/footer/footer.module';
import { HeaderModule } from '@components/header/header.module';
import { InputErrorModule } from '@components/input-error/input-error.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnterCodePageRoutingModule,
    ReactiveFormsModule,
    HeaderModule,
    FooterModule,
    AutomaticTokenPageModule,
    TranslateModule,
    InputErrorModule
    
  ],
  declarations: [EnterCodePage]
})
export class EnterCodePageModule {}
