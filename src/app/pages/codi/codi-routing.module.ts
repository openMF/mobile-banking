import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodiPage } from './codi.page';

const routes: Routes = [
  {
    path: '',
    component: CodiPage
  },  {
    path: 'pay-codi',
    loadChildren: () => import('./components/pay-codi/pay-codi.module').then( m => m.PayCodiPageModule)
  },
  {
    path: 'collect-codi',
    loadChildren: () => import('./components/collect-codi/collect-codi.module').then( m => m.CollectCodiPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodiPageRoutingModule {}
