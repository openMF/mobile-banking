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


