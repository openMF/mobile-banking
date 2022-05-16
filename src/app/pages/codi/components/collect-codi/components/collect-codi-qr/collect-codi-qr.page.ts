import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-collect-codi-qr',
  templateUrl: './collect-codi-qr.page.html',
  styleUrls: ['./collect-codi-qr.page.scss'],
})
export class CollectCodiQrPage implements OnInit {

  public amount: number;

  public concept: string;

  public reference: string;

  constructor(protected activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const { amount, concept, reference } = this.activatedRoute.snapshot.queryParams;
    this.amount = amount;
    this.concept = concept;
    this.reference = reference;
  }

  public qrData = '{"ic": {"IDC": "287F2C0A78","SER":1,"ENC": "WV+fOaxzdv/Zeni2otIw6gzhI2ozN/CFW6yCjfqSfyNXQU4nCzovPGj6PHWCDcWYuqGd1s7gjttGFlJCnoystSqpaA4/zPM+iiYavYaoR21urJzYztaUd8ub7uGVsA/BfTFnRm1/P/4CRqIdaTuWw3Y6qpon9GEpLbL1Cs8WHKfMel5TTtYA9SoZRvSMkqjUf8G/smlenpHWUHERd/+TzlXSrguPtGp1Q74/S34sduzaJ7fev7u8TDYzQDC1wqRLtAnykVLT88o7VTJopYl0854KDCxWpMiAcCogaCAZ9fk="},"CRY": "+xzNFgnq5w5ypgfydP7p11vLhE9UH49PZnoybLlqn/I=","TYP": 19,"v": {"DEV": "5560129747/2"}}';

}
