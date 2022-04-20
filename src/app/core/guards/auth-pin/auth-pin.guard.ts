import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { environment } from '@env';

@Injectable({
  providedIn: 'root'
})
export class AuthPinGuard implements CanActivate {

  constructor(
    private router: Router,
    private storage: Storage
  ) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {  

      if (environment.mockLogin) {
        return true;
      }

      return this.storage.get('user-hash')
        .then(response => {
          if (response) {
            this.router.navigate(['/second-login', 'login']);
            return false;
          } 
          return true; 
        })
        .catch( () => true );
      
  }
  
}
