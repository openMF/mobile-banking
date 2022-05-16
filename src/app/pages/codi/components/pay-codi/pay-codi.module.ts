import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayCodiPageRoutingModule } from './pay-codi-routing.module';

import { PayCodiPage } from './pay-codi.page';
import { HelpersService } from '@services/helpers/helpers.service';
import { TranslateModule } from '@ngx-translate/core';
import { RoundingButtonModule } from '@components/rounding-button/rounding-button.module';
import { HeaderModule } from '@components/header/header.module';
import { FooterModule } from '@components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayCodiPageRoutingModule,
    TranslateModule,
    RoundingButtonModule,
    HeaderModule,
    FooterModule
  ],
  providers: [HelpersService],
  declarations: [PayCodiPage]
})
export class PayCodiPageModule {}
