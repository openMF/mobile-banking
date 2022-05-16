import { Component, OnInit } from '@angular/core';
import { ClientsService } from '@services/clients/clients.service';
import { UserService } from '@services/user/user.service';
import { Router } from '@angular/router';
import { HelpersService } from '@services/helpers/helpers.service';

export interface Programs {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  imageUrl: string;
  title: string;
  subTitle: string;
  text: string;
  styleClass: string;
  id: number;
}

@Component({
  selector: 'app-plan-social',
  templateUrl: './plan-social.page.html',
  styleUrls: ['./plan-social.page.scss'],
})
export class PlanSocialPage implements OnInit {

  public programs: Programs[];
  public flag: boolean;

  constructor(private clientsService: ClientsService, private userService: UserService, private router: Router, private helpersService: HelpersService) { }

  ngOnInit() {
    this.helpersService.presentLoading();
    this.clientsService.getSocialPrograms().toPromise()
      .then(programas => {
        this.programs = programas;
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        this.helpersService.hideLoading();
        this.flag = true;
      })
  }

  goToDetails(item: Programs) {
    this.userService.programaSocialSelected = item
    this.router.navigate(["/plan-social/program-details"])
  }

}
