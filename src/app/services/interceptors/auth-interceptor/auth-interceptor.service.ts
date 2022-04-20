import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { Storage } from '@ionic/storage';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from '@env';
import { timeout } from 'rxjs/operators';
import { AuthenticationService } from '@services/user/authentication.service';
import { HelpersService } from '@services/helpers/helpers.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private storage: Storage, 
    private authentication: AuthenticationService,
    private helpersService: HelpersService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    let request: HttpRequest<any> = req;
    let headers = {
      'Content-Type': 'application/json'
    };

    if (environment.graviteeEndpoints) {
      if (/\/spei-karpay\//g.test(req.url)) {
        headers['X-Gravitee-Api-Key'] = environment.cepGraviteeApiKey;
      } else if (/\/otp\//g.test(req.url)) {
        headers['X-Gravitee-Api-Key'] = environment.totpGraviteeApiKey;
      } else if (/\/banbi\//g.test(req.url)) {
        headers['X-Gravitee-Api-Key'] = environment.banbiGraviteeApiKey;
      } else {
        headers['X-Gravitee-Api-Key'] = environment.graviteeApiKey;
      }
    } else {
      headers['Fineract-Platform-TenantId'] = 'default';
    }

    request = request.clone({
      setHeaders: headers
    });
    
    return from(this.storage.get('token'))
      .pipe(
        switchMap( token => {

          if (token) {
            request = request.clone({
              setHeaders: {
                Authorization: `Basic ${token}`
              }
            });
          }

          return next.handle(request).pipe(
            timeout(30000),
            catchError((err: HttpErrorResponse) => {

              if (err.status === 401) {
                this.authentication.logout();
              } else if (err.status === 0 || err.status === 504 || err.message === 'Timeout has occurred') {
                
                setTimeout(() => {
                  this.authentication.cleanAllModals();
                  this.helpersService.hideLoading();    
                }, 300);
                setTimeout(() => this.helpersService.showNoInternet(), 750);
              }
      
              return throwError( err );
      
            })
          );
        })
      );
  }
}
