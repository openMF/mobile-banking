import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionLimitPage } from './transaction-limit.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionLimitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionLimitPageRoutingModule {}
