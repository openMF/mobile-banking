import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { CodesService } from '@services/catalogs/codes.service';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { HelpersService } from '@services/helpers/helpers.service';
import { UserService } from '@services/user/user.service';


@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {

  questions: any[] = [];
  skeleton: any[] = Array(5);
  isLoading: boolean = false;

  constructor(
    private alertController: AlertController, 
    private callNumber: CallNumber,
    private codesService: CodesService,
    private translate: TranslateService,
    private storage: Storage,
    private helpersService: HelpersService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.codesService.getFAQS().toPromise()
      .then( questions => this.questions = questions )
      .finally( () => this.isLoading = false );
  }

  public showAnswer(text: string): void {
    console.log('Hola Mundo');
  }

  public callToOffice() {
    this.storage.get('globals').then( globals => {
      if (!globals) return;
      this.callNumber.callNumber(globals['officePhoneNumber'].description, true)
        .then(res => console.log('Launched dialer!', res))
        .catch(err => console.log('Error launching dialer', err));
    } );
  }

  async presentAlertPrompt() {
    this.translate.get(['Send Email', 'Send', 'Message', 'Cancel', 'Subject', 'This field is required']).subscribe(async translate => {
      const alert = await this.alertController.create({
        header: translate['Send Email'],
        backdropDismiss: false,
        inputs: [
          {
            name: 'name1',
            id: 'subject',
            type: 'text',
            placeholder: translate['Subject']
          },
          // multiline input.
          {
            name: 'paragraph',
            id: 'paragraph',
            type: 'textarea',
            placeholder: translate['Message']
          }
        ],
        buttons: [
          {
            text: translate['Cancel'],
            role: 'cancel',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: translate['Send'],
            handler: () => {

              const subject = (document.getElementById('subject') as any).value;
              const text = (document.getElementById('paragraph') as any).value;
              

              if (!document.getElementById('text-error-subject') && !subject) {
                document.getElementById('subject')
                  .insertAdjacentHTML('afterend', `<span id="text-error-subject" style="color: #EB445A">${translate['This field is required']}<span>`);
              } else if (document.getElementById('text-error-subject') && subject) {
                document.getElementById('text-error-subject').remove();
              }

              if (!document.getElementById('text-error-paragraph') && !text) {
                document.getElementById('paragraph')
                  .insertAdjacentHTML('afterend', `<span id="text-error-paragraph" style="color: #EB445A">${translate['This field is required']}<span>`);
              } else if (document.getElementById('text-error-paragraph') && text) {
                document.getElementById('text-error-paragraph').remove();
              }

              if (!text || !subject) return false;

              this.helpersService.presentLoading();

              this.userService.sendSupportEmail({ subject, text }).then( async() => {
                await this.helpersService.showSuccessMessage('Mail Sent Successfully', 'Your email was successfully sent to the support team, we will follow up on your case as soon as possible and we will communicate with you via email or your phone number');
                alert.dismiss();
              } ).catch( async err => {
                console.log('ocurrio un error', err);
                
                if (err.status === 504 || err.status === 0) {
              
                } else {
                  await this.helpersService.showErrorMessage();
                }
                
              } ).finally( () => this.helpersService.hideLoading() );

                return false;
              
            }
          }
        ]
      });

      (document.getElementById('paragraph') as any).setAttribute('maxlength', '500');
      (document.getElementById('paragraph') as any).setAttribute('rows', '10');
      (document.getElementById('subject') as any).setAttribute('maxlength', '50');

      await alert.present();
    });

  }

}
