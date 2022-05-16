# Mobile-Banking

## Prerequisites

### MacOS

Install Node JS (version 17)
```
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
$ source .bash_profile 
$ nvm install 17  
$ node -v
```
Install Ionic Framework
```
$ npm install -g @ionic/cli
```
Install Android Developer Tools
Build for android
```
export NODE_OPTIONS=--openssl-legacy-provider
$ export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk
# avdmanager, sdkmanager
$ export PATH=$PATH:$ANDROID_SDK_ROOT/tools/bin
# adb, logcat
$ export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
# emulator
$ export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
```
Run on Native
```
$ npm run build-preprod android
$ adb install ./platforms/android/app/build/outputs/apk/debug/app-debug.apk
$ ionic cordova run android
```

Debug using Chrome, copy and paste.

chrome://inspect/#devices

## Getting started
Clone the project:

```
    $ git clone https://github.com/openMF/mobile-banking.git
```
Install dependencies:
```
    $ cd mobile-banking
    
    $ npm install
```
Run development web-server:
```
    $ npm run serve
```
Folder structure 

```
>app
    >components (componentes que podran ser utilizados más de una vez en toda la aplicacion como el header, footer, botones, etc.)
        >searchbar
            searchbar.component.css
            searchbar.component.html
            searchbar.component.spec.ts
            searchbar.component.ts
            searchbar.module.ts
        >breadcrumb
            breadcrumb.component.css
            breadcrumb.component.html
            breadcrumb.component.spec.ts
            breadcrumb.component.ts
            breadcrumb.module.ts
    >core (en el core module se cargan todas las dependencias que seran usadas en toda la aplicacion como el HttpClient, Translate, Interceptors, Guards etc.)
        >guards
        >interceptors
        core.module.ts
    >pages (vistas completas o paginas de la aplicacion)
        >clients
            >components (componentes que solo seran usados por este modulo/pagina)
                >table
                    clients.component.css
                    clients.component.html
                    clients.component.spec.ts
                    clients.component.ts
                    clients.module.ts
            clients.component.css
            clients.component.html
            clients.component.spec.ts
            clients.component.ts
            clients.module.ts
    >helpers (servicios que te ayuden a generar archivos, a procesar algo, etc., que son reutilizables)
    >modelos (interfaces/clases con la definicion de la estrutura que devolvera un determinado servicio)
        client.interface.ts
    >pipes
    >directives
    >services (servicios que utilizaran cada componente para obtener la data)
    >globals (variables globales para establecer rutas del api, mensajes de error, expresiones regulares, etc.)
        endpoints.ts
        regex.ts
```

Ionic Info:
```
Ionic:

   Ionic CLI                     : 6.19.0 (/usr/local/lib/node_modules/@ionic/cli)
   Ionic Framework               : @ionic/angular 5.0.1
   @angular-devkit/build-angular : 0.803.25
   @angular-devkit/schematics    : 8.3.25
   @angular/cli                  : 8.3.25
   @ionic/angular-toolkit        : 2.1.2

Capacitor:

   Capacitor CLI      : 1.5.0
   @capacitor/android : not installed
   @capacitor/core    : 1.5.0
   @capacitor/ios     : not installed

Cordova:

   Cordova CLI       : 10.0.0
   Cordova Platforms : android 9.1.0
   Cordova Plugins   : cordova-plugin-ionic-keyboard 2.2.0, cordova-plugin-ionic-webview 4.2.1, (and 19 other plugins)

Utility:

   cordova-res                          : 0.15.4
   native-run (update available: 1.6.0) : 1.3.0

System:

   Android SDK Tools : 26.1.1 (/Users/XXXXXXX/Library/Android/sdk)
   ios-sim           : 8.0.2
   NodeJS            : v17.9.0 (/usr/local/bin/node)
   npm               : 8.5.5
   OS                : macOS Monterey
   Xcode             : Xcode 13.3.1 Build version 13E500a

```
