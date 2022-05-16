import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayOrderPage } from './pay-order.page';

const routes: Routes = [
  {
    path: '',
    component: PayOrderPage
  },
  {
    path: 'generate-barcode',
    loadChildren: () => import('./components/generate-barcode/generate-barcode.module').then( m => m.GenerateBarcodePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayOrderPageRoutingModule {}
