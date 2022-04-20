import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-information-text',
  templateUrl: './information-text.page.html',
  styleUrls: ['./information-text.page.scss'],
})
export class InformationTextPage implements OnInit {

  backUrl: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const { backUrl } = this.activatedRoute.snapshot.queryParams;
    this.backUrl = backUrl;
  }

}
