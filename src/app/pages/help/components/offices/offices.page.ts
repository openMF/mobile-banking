import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import L from "leaflet";
import { Platform, ToastController } from '@ionic/angular';
import { OfficeService } from '@services/office/office.service';
import { TranslateService } from '@ngx-translate/core';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { HelpersService } from '@services/helpers/helpers.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-offices',
  templateUrl: './offices.page.html',
  styleUrls: ['./offices.page.scss'],
})
export class OfficesPage implements OnInit {

  map: L.Map;
  center: L.PointTuple;
  officeIcon: any;
  myPositionIcon: any;
  myPosition: {lat:number, lng:number};
  
  constructor(
      private toastCtrl: ToastController,
      private geolocation: Geolocation,
      private office: OfficeService,
      private translate: TranslateService,
      private locationAccuracy: LocationAccuracy,
      private helpersService: HelpersService,
      private router: Router,
      public platform: Platform
    ) {
  }

  ngOnInit() {
    this.startInit();    
  }

  ionViewWillLeave() {
    this.helpersService.hideLoading();
  }

  async startInit() {

    try {

      // const canRequest = await this.locationAccuracy.canRequest();

      if (this.platform.is('android')) {
        let locationActivated: boolean = false;
      
        locationActivated = await this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).catch( () => {
          return false;
        });  
    
        if (!locationActivated) {
          throw new Error('No se pudo activar la ubicación');
        }
      }

      this.helpersService.presentLoading();
      
      const geolocation = await this.geolocation.getCurrentPosition();

      if (!geolocation.coords) {
        throw new Error('No se pudo obtener la ubicación');
      }
  
      this.center = [geolocation.coords.latitude, geolocation.coords.longitude];
      this.myPosition = {lat: geolocation.coords.latitude, lng: geolocation.coords.longitude};

      setTimeout(() => this.start(), 350);

    } catch(e) {
      await this.helpersService.hideLoading();
      await this.helpersService.showSuccessMessage('Check your location', 'You need to activate your location to continue');
      this.router.navigateByUrl('/help');
    }

    this.helpersService.hideLoading();
  }

  throwError() {
    
  }
  

  getNearOffices() {
    this.office.postNearOffices(this.myPosition.lat, this.myPosition.lng).toPromise().then( (offices: any[]) => {
      
      for (const key in offices) {
        for (const key2 in offices[key].address) { 
          this.setMapMarker(offices[key].address[key2].latitude, offices[key].address[key2].longitude, this.officeIcon);
        }
      }
      
    } );
  } 

  start() {
    
    this.initMap();

    this.officeIcon = this.setMapMarkerSettings('assets/icon/icon-bank.png');

    this.myPositionIcon = this.setMapMarkerSettings('assets/icon/marker-blue.svg');

    if (this.myPosition) {
      this.getNearOffices();
    }

    if (!this.myPosition) {
      return;
    }

    this.setMapMarker(this.myPosition.lat, this.myPosition.lng, this.myPositionIcon);

    this.helpersService.hideLoading();

    this.translate.get('Visit us at the office closest to you.')
      .subscribe( (resp: any) => this.mensaje(resp) );
  
  }

  setMapMarkerSettings(iconUrl: string): any {
    return L.icon({
      iconUrl,
      shadowUrl: '',
      iconSize: [32, 32], // size of the icon
      shadowSize: [0, 0], // size of the shadow
      iconAnchor: [32, 32], // point of the icon which will correspond to markers location
      shadowAnchor: [0, 0], // the same for the shadow
      popupAnchor: [32, 20] // point from which the popup should open relative to the iconAnchor
    });
  }

  setMapMarker(lat: number, lng: number, icon: string): any {
    return L.marker({lat, lng}, { icon })
        .addTo(this.map);
  }
  
  initMap() {

    this.map = L.map('map', {
      center: this.center,
      zoom: 13,
      zoomControl: false
    });

    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; Código 200'
    })
      .addTo(this.map);

    L.control.zoom({
      position: 'bottomright'
    }).addTo(this.map);

  }
 
  async mensaje(texto) {
    let toast = await this.toastCtrl.create({
      message: texto,
      position: 'bottom',
      duration: 6000
    });
    toast.present();
  }

}
