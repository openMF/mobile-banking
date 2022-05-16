import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


declare var domtoimage: any;

@Component({
  selector: 'app-generate-barcode',
  templateUrl: './generate-barcode.page.html',
  styleUrls: ['./generate-barcode.page.scss'],
})
export class GenerateBarcodePage implements OnInit {

  public transactionAmount: number;

  public routingCode: string;

  public code: string;

  public displayName: string;

  public showBackButton: string;

  @ViewChild('pageShare',{static: true}) pageShare: ElementRef; 

  constructor(
    protected activatedRoute: ActivatedRoute, 
    protected storage: Storage,
    protected translate: TranslateService,
    protected socialSharing: SocialSharing
  ) { }

  ngOnInit() {
    const { transactionAmount, code, routingCode, showBackButton = 'false' } = this.activatedRoute.snapshot.queryParams;
    console.log(this.activatedRoute.snapshot.queryParams);
    
    this.showBackButton = showBackButton;
    this.code = code.substring(0,12);
    this.transactionAmount = transactionAmount;
    this.routingCode = routingCode;

    this.storage.get("personal-info").then( personalInfo => this.displayName = personalInfo.displayName );
  }

  async onShare() {

    const element = this.pageShare.nativeElement;
    const textSuccess = await this.translate.get('Pay Order').toPromise();
    const scale = 750 / element.offsetWidth;
    
    domtoimage.toPng(element, {
      height: element.offsetHeight * scale,
      width: element.offsetWidth * scale,
      style: {
        transform: "scale(" + scale + ")",
        transformOrigin: "top left",
        width: element.offsetWidth + "px",
        height: element.offsetHeight + "px"
      }
    }).then( (dataUrl) => {
          this.socialSharing.share(`${textSuccess} | Banco del Bienestar`, null, dataUrl);
      }).catch( (error) => {
          console.error('oops, something went wrong!', error);
      });
  }

}
