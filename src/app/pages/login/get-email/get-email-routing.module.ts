import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetEmailPage } from './get-email.page';

const routes: Routes = [
  {
    path: '',
    component: GetEmailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetEmailPageRoutingModule {}
