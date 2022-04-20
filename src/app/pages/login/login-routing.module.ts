import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },  {
    path: 'get-email',
    loadChildren: () => import('./get-email/get-email.module').then( m => m.GetEmailPageModule)
  },
  {
    path: 'enter-code',
    loadChildren: () => import('./enter-code/enter-code.module').then( m => m.EnterCodePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
