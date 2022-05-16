import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayCodiPage } from './pay-codi.page';

const routes: Routes = [
  {
    path: '',
    component: PayCodiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayCodiPageRoutingModule {}
