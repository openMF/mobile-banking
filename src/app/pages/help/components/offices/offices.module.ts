import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfficesPageRoutingModule } from './offices-routing.module';

import { OfficesPage } from './offices.page';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderModule } from '@components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfficesPageRoutingModule,
    TranslateModule,
    HeaderModule
  ],
  declarations: [OfficesPage]
})
export class OfficesPageModule {}
