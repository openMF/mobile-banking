import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanSocialPage } from './plan-social.page';

const routes: Routes = [
  {
    path: '',
    component: PlanSocialPage
  },
 
  {
    path: 'program-details',
    loadChildren: () => import('./components/program-details/program-details/program-details.module').then( m => m.ProgramDetailsPageModule)
  },
  {
    path: 'program-more-info',
    loadChildren: () => import('./components/program-details/program-more-info/program-more-info/program-more-info.module').then( m => m.ProgramMoreInfoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanSocialPageRoutingModule {}
 