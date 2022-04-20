import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgComponent } from './svg.component';

@NgModule({
  declarations: [SvgComponent],
  imports: [
    CommonModule
  ],
  exports: [
    SvgComponent
  ]
})
export class SvgModule { }
