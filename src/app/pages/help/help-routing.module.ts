import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpPage } from './help.page';

const routes: Routes = [
  {
    path: '',
    component: HelpPage
  },
  {
    path: 'answer',
    loadChildren: () => import('./components/answer/answer.module').then( m => m.AnswerPageModule)
  },
  {
    path: 'offices',
    loadChildren: () => import('./components/offices/offices.module').then( m => m.OfficesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpPageRoutingModule {}
