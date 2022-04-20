import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab4PageRoutingModule } from './tab4-routing.module';

import { Tab4Page } from './tab4.page';
import { TranslateModule } from '@ngx-translate/core';
import { InputErrorModule } from '@components/input-error/input-error.module';
import { HttpClientModule } from '@angular/common/http';
import { HeaderModule } from '@components/header/header.module';
import { FooterModule } from '@components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab4PageRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    InputErrorModule,
    HttpClientModule,
    HeaderModule,
    FooterModule
  ],
  declarations: [Tab4Page]
})
export class Tab4PageModule {}
