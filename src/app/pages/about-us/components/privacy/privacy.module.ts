import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrivacyPageRoutingModule } from './privacy-routing.module';

import { PrivacyPage } from './privacy.page';
import { TranslateModule } from '@ngx-translate/core';
import { SvgModule } from '@components/svg/svg.module';
import { FooterModule } from '@components/footer/footer.module';
import { HeaderModule } from '@components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrivacyPageRoutingModule,
    TranslateModule,
    SvgModule,
    FooterModule,
    HeaderModule
  ],
  declarations: [PrivacyPage]
})
export class PrivacyPageModule {}
