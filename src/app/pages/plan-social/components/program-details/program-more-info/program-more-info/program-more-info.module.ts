import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramMoreInfoPageRoutingModule } from './program-more-info-routing.module';

import { ProgramMoreInfoPage } from './program-more-info.page';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderModule } from '@components/header/header.module';
import { FooterModule } from '@components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgramMoreInfoPageRoutingModule, 
    TranslateModule,
    HeaderModule,
    FooterModule
  ],
  declarations: [ProgramMoreInfoPage]
})
export class ProgramMoreInfoPageModule {}
