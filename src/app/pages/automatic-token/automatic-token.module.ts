import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutomaticTokenPageRoutingModule } from './automatic-token-routing.module';

import { AutomaticTokenPage } from './automatic-token.page';
import { HeaderModule } from '@components/header/header.module';
import { FooterModule } from '@components/footer/footer.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutomaticTokenPageRoutingModule,
    HeaderModule,
    FooterModule,
    TranslateModule
  ],
  declarations: [AutomaticTokenPage],
  entryComponents: [AutomaticTokenPage]
})
export class AutomaticTokenPageModule {}
