import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '@services/user/authentication.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private storage: Storage
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    const isAuth: boolean = this.authenticationService.isAuthenticated();
    if (!isAuth) {
      if (route.routeConfig.path === 'second-login') {
        return this.storage.get('user-hash').then( hash => {
          if (!hash) { throw new Error; }
          return true;
        } ).catch( () => {
          this.router.navigate(['/login']);
          return false;
        } );
      }
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
