import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerateBarcodePage } from './generate-barcode.page';

const routes: Routes = [
  {
    path: '',
    component: GenerateBarcodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenerateBarcodePageRoutingModule {}
