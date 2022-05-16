import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanSocialPageRoutingModule } from './plan-social-routing.module';

import { PlanSocialPage } from './plan-social.page';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderModule } from '@components/header/header.module';
import { FooterModule } from '@components/footer/footer.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanSocialPageRoutingModule, 
    TranslateModule,
    HeaderModule,
    FooterModule
  ],
  declarations: [PlanSocialPage]
})
export class PlanSocialPageModule {
}
