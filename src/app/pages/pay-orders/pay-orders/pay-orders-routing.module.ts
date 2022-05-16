import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayOrdersPage } from './pay-orders.page';

const routes: Routes = [
  {
    path: '',
    component: PayOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayOrdersPageRoutingModule {}
