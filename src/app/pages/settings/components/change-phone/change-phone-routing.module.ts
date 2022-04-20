import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangePhonePage } from './change-phone.page';

const routes: Routes = [
  {
    path: '',
    component: ChangePhonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangePhonePageRoutingModule {}
