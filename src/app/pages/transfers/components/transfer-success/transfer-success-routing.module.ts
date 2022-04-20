import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransferSuccessPage } from './transfer-success.page';

const routes: Routes = [
  {
    path: '',
    component: TransferSuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferSuccessPageRoutingModule {}
