import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutomaticTokenPage } from './automatic-token.page';

const routes: Routes = [
  {
    path: '',
    component: AutomaticTokenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutomaticTokenPageRoutingModule {}
