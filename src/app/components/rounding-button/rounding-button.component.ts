import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rounding-button',
  templateUrl: './rounding-button.component.html',
  styleUrls: ['./rounding-button.component.scss'],
})
export class RoundingButtonComponent implements OnInit {
  
  @Input() title: string;

  @Input() disabled: boolean = false;

  @Input() link: string|string[];

  @Input() iconType: 'check'|'add'|'close';

  constructor() { }

  ngOnInit() {
    console.log(this.disabled);
  }

}
