import { Component, OnInit } from '@angular/core';
import { UserService } from '@services/user/user.service';
import { Programs } from '@pages/plan-social/plan-social.page';
import { Router } from '@angular/router';


@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.page.html',
  styleUrls: ['./program-details.page.scss'],
})
export class ProgramDetailsPage implements OnInit {

  public program: Programs;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    // if (!this.userService.programaSocialSelected) {
    //   this.router.navigate(["/plan-social"])
    // }

    this.program = this.userService.programaSocialSelected
  }

  goToDetails(item: Programs) {
    this.userService.programaSocialSelected = item
    this.router.navigate(["/plan-social/program-more-info"])
  }

}
