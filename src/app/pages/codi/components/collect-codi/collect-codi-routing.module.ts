import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectCodiPage } from './collect-codi.page';

const routes: Routes = [
  {
    path: '',
    component: CollectCodiPage
  },
  {
    path: 'generate-qr',
    loadChildren: () => import('./components/collect-codi-qr/collect-codi-qr.module').then( m => m.CollectCodiQrPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectCodiPageRoutingModule {}
