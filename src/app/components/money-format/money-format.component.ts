import { Component, OnInit, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { environment } from '@env';

@Component({
  selector: 'app-money-format',
  templateUrl: './money-format.component.html',
  styleUrls: ['./money-format.component.scss'],
})
export class MoneyFormatComponent implements OnInit {

  @Input() amount: string;

  public decimals: string;

  constructor(protected currencyPipe: CurrencyPipe) { }

  ngOnInit() {
    //TODO cambiar para que el transform solo tenga como parametro el amount - hay que poner el locale solo en un modulo 
    let amount = this.currencyPipe.transform(this.amount, undefined, 'symbol', undefined, "en-US"  );
    const len = amount ? amount.length : 0;
    this.decimals = amount ? amount.substring(len - 2, len) : '00';
    this.amount = amount ? amount.substring(0, len - 2) : '0';
  }

}
