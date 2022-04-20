import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformationTextPage } from './information-text.page';

const routes: Routes = [
  {
    path: '',
    component: InformationTextPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformationTextPageRoutingModule {}
