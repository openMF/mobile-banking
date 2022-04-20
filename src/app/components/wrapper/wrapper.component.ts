import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
})
export class WrapperComponent implements OnInit {

  height: any = '100%';

  constructor() { }

  ngOnInit() {
      setTimeout(() => {
        this.height = document.getElementById('main-container').offsetHeight+'px';
      }, 500);
  }

}
