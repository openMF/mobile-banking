import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutUsPageRoutingModule } from './about-us-routing.module';

import { AboutUsPage } from './about-us.page';
import { TranslateModule } from '@ngx-translate/core';
import { SvgModule } from '@components/svg/svg.module';
import { FooterModule } from '@components/footer/footer.module';
import { HeaderModule } from '@components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutUsPageRoutingModule,
    TranslateModule,
    SvgModule,
    FooterModule,
    HeaderModule
  ],
  declarations: [AboutUsPage]
})
export class AboutUsPageModule {}
