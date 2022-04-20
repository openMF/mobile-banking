import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ClientsService } from '@services/clients/clients.service';
import { PersonalInfo } from '@globals/interfaces/personal-info';
import { UserService } from '@services/user/user.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from '@services/user/authentication.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit {

  constructor(
    private clientsService: ClientsService,
    public userService: UserService,
    private socialSharing: SocialSharing,
    private storage: Storage,
    private authentication: AuthenticationService,
    private router: Router,
    private menu: MenuController
  ) {
    this.getPersonalInfo();
  }

  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/dashboard',
      icon: 'home-outline'
    },
    {
      title: 'Transfers',
      url: '/transfers',
      icon: 'swap-horizontal-outline'
    },
    // {
    //   title: 'Pay Orders',
    //   url: '/pay-orders',
    //   icon: 'wallet-outline'
    // },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'settings-outline'
    },
    // {
    //   title: 'Límites Transaccionales',
    //   url: '/transaction-limit',
    //   icon: 'document-outline'
    // },
    {
      title: 'About Us',
      url: '/about-us',
      icon: 'information-circle-outline'
    },
    {
      title: 'Help',
      url: '/help',
      icon: 'help-circle-outline'
    },
    {
      title: 'Share',
      funtion: this.share.bind(this),
      icon: 'share-social-outline'
    },
    {
      title: 'Sign off',
      funtion: this.logout.bind(this),
      icon: 'log-out-outline'
    }
  ];

  public labels = ['V.0.0.1'];
  public personalInfo: PersonalInfo;
  public avatarUrl: string = '/assets/header-icons/icon-user.png';

  ngOnInit() {
    this.storage.get('image-profile').then(image => {
      if (image) {
        this.avatarUrl = image;
      }
    })
  }

  public share(index: number): void {
    this.selectedIndex = index;
    this.storage.get('globals').then( globals => {
      if (!globals) return;
      this.socialSharing.share('Banco del Bienestar', null, null, globals['bancoBienestarUrl'].description);
    } );

  }

  public logout() {
    this.authentication.logout();
    this.menu.enable(false);
  }

  private getPersonalInfo() {
    this.clientsService.getPersonalInfo()
      .then((data: PersonalInfo) => {
        this.personalInfo = data;
      });
  }
}
