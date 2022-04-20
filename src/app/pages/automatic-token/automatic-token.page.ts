import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-automatic-token',
  templateUrl: './automatic-token.page.html',
  styleUrls: ['./automatic-token.page.scss'],
})
export class AutomaticTokenPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  onAccept() {
    this.modalController.dismiss({
      accept: true
    });
  }

  onCancel() {
    this.modalController.dismiss({
      accept: false
    });
  }

}
