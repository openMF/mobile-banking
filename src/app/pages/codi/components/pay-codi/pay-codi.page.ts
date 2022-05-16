import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelpersService } from '@services/helpers/helpers.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-pay-codi',
  templateUrl: './pay-codi.page.html',
  styleUrls: ['./pay-codi.page.scss'],
})
export class PayCodiPage implements OnInit {

  public payload: any;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private helpersService: HelpersService,
    private translate: TranslateService,
    private route: Router
  ) { 
    const { payload } = this.activatedRoute.snapshot.params;
    this.payload  = JSON.parse(payload);
    console.log(this.activatedRoute.snapshot.params);
  }

  ngOnInit() {
  }

  public onCancel() {
    this.translate.get([
      'Reject', 
      'Do you want to reject the payment with CoDi?'
    ]).subscribe( (resp: any) => {
      this.helpersService
        .showAlert(resp.Reject, resp['Do you want to reject the payment with CoDi?'])
        .then( () => this.route.navigate(['/dashboard']) );
    } )
  }

  public onPostpone() {
    this.translate.get([
      'Postpone', 
      'Do you want to postpone payment with CoDi?'
    ]).subscribe( (resp: any) => {
      this.helpersService
        .showAlert(resp.Postpone, resp['Do you want to postpone payment with CoDi?'])
        .then( (result) => console.log(result) );
    } )
  }

  public onAccept() {
    this.translate.get([
      'Pay', 
      'Do you want to pay with CoDi?'
    ]).subscribe( (resp: any) => {
      this.helpersService
        .showAlert(resp.Pay, resp['Do you want to pay with CoDi?'])
        .then( (result) => this.route.navigate(['/dashboard']) );
    } )
  }

}
