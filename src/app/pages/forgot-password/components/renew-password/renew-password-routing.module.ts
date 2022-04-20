import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RenewPasswordPage } from './renew-password.page';

const routes: Routes = [
  {
    path: '',
    component: RenewPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RenewPasswordPageRoutingModule {}
