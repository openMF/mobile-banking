import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecondLoginPage } from './second-login.page';

const routes: Routes = [
  {
    path: '',
    component: SecondLoginPage
  },
  {
    path: ':type',
    component: SecondLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecondLoginPageRoutingModule {}
