import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollectCodiPageRoutingModule } from './collect-codi-routing.module';

import { CollectCodiPage } from './collect-codi.page';
import { TranslateModule } from '@ngx-translate/core';
import { RoundingButtonModule } from '@components/rounding-button/rounding-button.module';
import { InputErrorModule } from '@components/input-error/input-error.module';
import { HeaderModule } from '@components/header/header.module';
import { FooterModule } from '@components/footer/footer.module';
import { WrapperModule } from '@components/wrapper/wrapper.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollectCodiPageRoutingModule,
    TranslateModule,
    RoundingButtonModule,
    ReactiveFormsModule,
    InputErrorModule,
    HeaderModule,
    FooterModule,
    WrapperModule
  ],
  declarations: [CollectCodiPage]
})
export class CollectCodiPageModule {}
