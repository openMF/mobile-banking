import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SoftTokenPage } from './soft-token.page';

const routes: Routes = [
  {
    path: '',
    component: SoftTokenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SoftTokenPageRoutingModule {}
