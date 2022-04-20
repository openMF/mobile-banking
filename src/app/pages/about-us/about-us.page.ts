import { Component, OnInit } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {

  public versionNumber: string = '1.0';

  public privacyPoliciesUrl: string = 'https://www.gob.mx/aviso_de_privacidad';

  constructor(private appVersion: AppVersion, private storage: Storage) { }

  ngOnInit() {
    this.appVersion.getVersionNumber().then(value => this.versionNumber = value );
    this.storage.get('globals').then( globals => {
      if (!globals) return;
      this.privacyPoliciesUrl = globals['privacyPoliciesUrl'].description;
    } );
  }

}
