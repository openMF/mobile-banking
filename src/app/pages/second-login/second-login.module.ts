import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SecondLoginPageRoutingModule } from './second-login-routing.module';

import { SecondLoginPage } from './second-login.page';
import { InputErrorModule } from '@components/input-error/input-error.module';
import { TranslateModule } from '@ngx-translate/core';
import { SvgModule } from '@components/svg/svg.module';
import { FooterModule } from '@components/footer/footer.module';
import { HeaderModule } from '@components/header/header.module';
@NgModule({
  entryComponents: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SecondLoginPageRoutingModule,
    ReactiveFormsModule,
    InputErrorModule,
    TranslateModule,
    SvgModule,
    FooterModule,
    HeaderModule,
  ],
  declarations: [SecondLoginPage]
})
export class SecondLoginPageModule {}
