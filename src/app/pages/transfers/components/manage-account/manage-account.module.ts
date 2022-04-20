import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageAccountPageRoutingModule } from './manage-account-routing.module';

import { ManageAccountPage } from './manage-account.page';
import { TranslateModule } from '@ngx-translate/core';
import { InputErrorModule } from '@components/input-error/input-error.module';
import { HeaderModule } from '@components/header/header.module';
import { FooterModule } from '@components/footer/footer.module';
import { AutomaticTokenPageModule } from '@pages/automatic-token/automatic-token.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageAccountPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    InputErrorModule,
    HeaderModule,
    FooterModule,
    AutomaticTokenPageModule
  ],
  declarations: [ManageAccountPage],
  entryComponents: [ManageAccountPage]
})
export class ManageAccountPageModule {}
