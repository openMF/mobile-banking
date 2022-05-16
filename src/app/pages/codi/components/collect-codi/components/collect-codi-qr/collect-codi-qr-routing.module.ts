import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectCodiQrPage } from './collect-codi-qr.page';

const routes: Routes = [
  {
    path: '',
    component: CollectCodiQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectCodiQrPageRoutingModule {}
