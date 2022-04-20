import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnterCodePage } from './enter-code.page';

const routes: Routes = [
  {
    path: '',
    component: EnterCodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterCodePageRoutingModule {}
