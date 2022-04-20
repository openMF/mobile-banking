import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangePinPage } from './change-pin.page';

const routes: Routes = [
  {
    path: '',
    component: ChangePinPage
  },
  {
    path: ':type',
    component: ChangePinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangePinPageRoutingModule {}
