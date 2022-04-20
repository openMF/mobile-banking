import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
})
export class PrivacyPage implements OnInit {

  constructor(private storage: Storage) { }

  ngOnInit() {
    this.storage.get('globals').then(globals => {
      if (!globals) { return; }
    });
  }

}
