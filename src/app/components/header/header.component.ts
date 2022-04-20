import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() img?: string;
  @Input() title?: string;
  @Input() bottomTitle?: string;
  @Input() centerTitle: boolean = true;
  @Input() menu?: boolean;
  @Input() svg?: boolean;
  @Input() backButton?: boolean;
  @Input() showNotifications?: boolean;
  @Input() defaultHref?: string;
  @Input() notifications?: string;
  @Input() dismissButton?: string;
  @Input() backButtonEnd?: string;
  @Input() home?: string;
  
  constructor(private modalController: ModalController, private router : Router) { }

  ngOnInit() {}

  public dismissModal() {
    this.modalController.dismiss();
  }

  public goNotifications(){
    this.router.navigate(['/notifications']);
  }

  public goHome(){
    this.router.navigate(['/dashboard']);
  }
}
