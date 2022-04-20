import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnswerPageRoutingModule } from './answer-routing.module';

import { AnswerPage } from './answer.page';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderModule } from '@components/header/header.module';
import { FooterModule } from '@components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnswerPageRoutingModule,
    TranslateModule,
    HeaderModule,
    FooterModule
  ],
  declarations: [AnswerPage]
})
export class AnswerPageModule {}
