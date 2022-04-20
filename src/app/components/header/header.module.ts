import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { SvgModule } from '@components/svg/svg.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    SvgModule,
    IonicModule,
    TranslateModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
