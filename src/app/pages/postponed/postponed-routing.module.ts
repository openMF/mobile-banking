import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostponedPage } from './postponed.page';

const routes: Routes = [
  {
    path: '',
    component: PostponedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostponedPageRoutingModule {}
