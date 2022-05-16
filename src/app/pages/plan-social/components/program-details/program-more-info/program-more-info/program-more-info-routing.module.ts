import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgramMoreInfoPage } from './program-more-info.page';

const routes: Routes = [
  {
    path: '',
    component: ProgramMoreInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgramMoreInfoPageRoutingModule {}
