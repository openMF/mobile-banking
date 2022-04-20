import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformationTextPageRoutingModule } from './information-text-routing.module';

import { InformationTextPage } from './information-text.page';
import { FooterModule } from '@components/footer/footer.module';
import { HeaderModule } from '@components/header/header.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformationTextPageRoutingModule,
    FooterModule,
    HeaderModule,
    TranslateModule
  ],
  declarations: [InformationTextPage]
})
export class InformationTextPageModule {}
