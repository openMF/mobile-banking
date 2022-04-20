import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RenewPasswordPageRoutingModule } from './renew-password-routing.module';

import { RenewPasswordPage } from './renew-password.page';
import { HeaderModule } from '@components/header/header.module';
import { FooterModule } from '@components/footer/footer.module';
import { TranslateModule } from '@ngx-translate/core';
import { InputErrorModule } from '@components/input-error/input-error.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RenewPasswordPageRoutingModule,
    HeaderModule,
    FooterModule,
    TranslateModule,
    ReactiveFormsModule,
    InputErrorModule
  ],
  declarations: [RenewPasswordPage]
})
export class RenewPasswordPageModule {}
