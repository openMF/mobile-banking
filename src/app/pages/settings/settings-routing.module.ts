import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsPage } from './settings.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage
  },
  {
    path: 'change-password',
    loadChildren: () => import('./components/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'change-pin',
    loadChildren: () => import('./components/change-pin/change-pin.module').then( m => m.ChangePinPageModule)
  },
  {
    path: 'change-phone',
    loadChildren: () => import('./components/change-phone/change-phone.module').then( m => m.ChangePhonePageModule)
  },
  {
    path: 'change-email',
    loadChildren: () => import('./components/change-email/change-email.module').then( m => m.ChangeEmailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule {}
