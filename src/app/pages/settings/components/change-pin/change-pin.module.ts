import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangePinPageRoutingModule } from './change-pin-routing.module';

import { ChangePinPage } from './change-pin.page';
import { InputErrorModule } from '@components/input-error/input-error.module';
import { TranslateModule } from '@ngx-translate/core';
import { SvgModule } from '@components/svg/svg.module';
import { FooterModule } from '@components/footer/footer.module';
import { HeaderModule } from '@components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangePinPageRoutingModule,
    ReactiveFormsModule,
    InputErrorModule,
    TranslateModule,
    SvgModule,
    FooterModule,
    HeaderModule
  ],
  declarations: [ChangePinPage]
})
export class ChangePinPageModule {}
