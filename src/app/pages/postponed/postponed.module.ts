import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostponedPageRoutingModule } from './postponed-routing.module';

import { PostponedPage } from './postponed.page';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderModule } from '@components/header/header.module';
import { FooterModule } from '@components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostponedPageRoutingModule, 
    TranslateModule,
    HeaderModule,
    FooterModule
  ],
  declarations: [PostponedPage]
})
export class PostponedPageModule {}
