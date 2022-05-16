import { Component, OnInit } from '@angular/core';
import { UserService } from '@services/user/user.service';
import { Programs } from '@pages/plan-social/plan-social.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-program-more-info',
  templateUrl: './program-more-info.page.html',
  styleUrls: ['./program-more-info.page.scss'],
})
export class ProgramMoreInfoPage implements OnInit {

  public program: Programs;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {

    // if (!this.userService.programaSocialSelected) {
    //   this.router.navigate(["/plan-social"])
    // }
    this.program = this.userService.programaSocialSelected
  }

}
