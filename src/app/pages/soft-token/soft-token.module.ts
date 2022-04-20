import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SoftTokenPageRoutingModule } from './soft-token-routing.module';

import { SoftTokenPage } from './soft-token.page';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderModule } from '@components/header/header.module';
import { FooterModule } from '@components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SoftTokenPageRoutingModule,
    TranslateModule,
    HeaderModule,
    FooterModule
  ],
  declarations: [SoftTokenPage]
})
export class SoftTokenPageModule {}
