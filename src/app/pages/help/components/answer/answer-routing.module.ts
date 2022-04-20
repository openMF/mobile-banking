import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnswerPage } from './answer.page';

const routes: Routes = [
  {
    path: '',
    component: AnswerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnswerPageRoutingModule {}
