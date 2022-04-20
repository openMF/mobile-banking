import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthGuard } from '@core/guards/auth/auth.guard';
import { AuthPinGuard } from '@core/guards/auth-pin/auth-pin.guard';
import { RegistrationGuard } from '@core/guards/registration/registration.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'second-login',
    canActivate: [AuthGuard],
    loadChildren: () => import('@pages/second-login/second-login.module').then(m => m.SecondLoginPageModule)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('@pages/dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('@pages/registration/registration.module').then(m => m.RegistrationPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('@pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'codi',
    canActivate: [AuthGuard],
    loadChildren: () => import('@pages/codi/codi.module').then(m => m.CodiPageModule)
  },
  {
    path: 'pay-codi/:payload',
    canActivate: [AuthGuard],
    loadChildren: () => import('@pages/codi/components/pay-codi/pay-codi.module').then(m => m.PayCodiPageModule)
  },
  {
    path: 'collect-codi',
    canActivate: [AuthGuard],
    loadChildren: () => import('@pages/codi/components/collect-codi/collect-codi.module').then(m => m.CollectCodiPageModule)
  },
  {
    path: 'soft-token',
    // canActivate: [AuthGuard],
    loadChildren: () => import('@pages/soft-token/soft-token.module').then(m => m.SoftTokenPageModule)
  },
  {
    path: 'transfers',
    canActivate: [AuthGuard],
    loadChildren: () => import('@pages/transfers/transfers.module').then(m => m.TransfersPageModule)
  },
  {
    path: 'notifications',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/notifications/notifications.module').then(m => m.NotificationsPageModule)
  },
  {
    path: 'postponed',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/postponed/postponed.module').then(m => m.PostponedPageModule)
  },
  {
    path: 'login',
    canActivate: [AuthPinGuard],
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'help',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/help/help.module').then(m => m.HelpPageModule)
  },
  {
    path: 'about-us',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/about-us/about-us.module').then(m => m.AboutUsPageModule)
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule)
  },
  {
    path: 'plan-social',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./pages/plan-social/plan-social.module').then(m => m.PlanSocialPageModule)
  },
  {
    path: 'not-found',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundPageModule)
  },
  {
    path: 'pay-order',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/pay-order/pay-order.module').then( m => m.PayOrderPageModule)
  },
  {
    path: 'pay-orders',
    loadChildren: () => import('./pages/pay-orders/pay-orders/pay-orders.module').then( m => m.PayOrdersPageModule)
  },
  {
    path: 'automatic-token',
    loadChildren: () => import('./pages/automatic-token/automatic-token.module').then( m => m.AutomaticTokenPageModule)
  },
  {
    path: 'information-text',
    loadChildren: () => import('./pages/information-text/information-text.module').then( m => m.InformationTextPageModule)
  },
  {
    path: 'transaction-limit',
    loadChildren: () => import('./pages/transaction-limit/transaction-limit.module').then( m => m.TransactionLimitPageModule)
  },
  { path: "**", redirectTo: "not-found" },
];

@NgModule({
  imports: [
    TranslateModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
