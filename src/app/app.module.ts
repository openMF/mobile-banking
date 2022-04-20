import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Sim } from '@ionic-native/sim/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';;
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { AuthInterceptorService } from '@services/interceptors/auth-interceptor/auth-interceptor.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { AES256 } from '@ionic-native/aes-256/ngx';
import { MenuModule } from '@components/menu/menu.module';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { MomentModule } from 'angular2-moment'; // optional, provides moment-style pipes for date formatting
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Network } from '@ionic-native/network/ngx';


import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';


registerLocaleData(es);

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    MenuModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
  ],
  providers: [
    StatusBar,
    BarcodeScanner,
    InAppBrowser,
    Base64ToGallery,
    AndroidPermissions,
    SplashScreen,
    AppVersion,
    CallNumber,
    Geolocation,
    SocialSharing,
    Camera,
    File,
    ScreenOrientation,
    Sim,
    LocationAccuracy,
    LocalNotifications,
    Network,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    AES256,
    { provide: LOCALE_ID, useValue: environment.locale }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
