import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransfersPage } from './transfers.page';
import { AuthGuard } from '@core/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TransfersPage
  },
  {
    path: 'manage-account',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/manage-account/manage-account.module').then( m => m.ManageAccountPageModule)
  }, 
  {
    path: 'transfer-success',
    loadChildren: () => import('./components/transfer-success/transfer-success.module').then( m => m.TransferSuccessPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TranfersPageRoutingModule {}
