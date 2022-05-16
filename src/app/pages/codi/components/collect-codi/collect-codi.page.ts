import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HelpersService } from '@services/helpers/helpers.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-collect-codi',
  templateUrl: './collect-codi.page.html',
  styleUrls: ['./collect-codi.page.scss'],
})
export class CollectCodiPage implements OnInit {

  public formGroup: FormGroup;

  constructor(
    protected formBuilder: FormBuilder,
    protected router: Router,
    protected helpersService: HelpersService,
    protected translate: TranslateService,
    protected alertController: AlertController
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      concept: ['', [Validators.required, Validators.minLength(5)]],
      reference: '',
    });

  }

  get formControls() {
    return this.formGroup.controls;
  }

  public onCancel(): void {

    this.translate.get([
      'Cancel',
      'Do you want to cancel the collect with CoDi?'
    ]).subscribe((resp: any) => {
      this.helpersService
        .showAlert(resp.Reject, resp['Do you want to cancel the collect with CoDi?'])
        .then(() => this.router.navigate(['/dashboard']));
    })
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¡Error!',
      subHeader: 'Información invalida',
      message: 'No se pudo generar correctamente el código QR.',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]

    });

    await alert.present();
  }

  public onClick(): void {

    // this.presentAlert();
    // if (this.formGroup.invalid || true) {
    //   return;
    // }

    console.log(this.formGroup.value);

    this.translate.get([
      'Accept',
      'The information is correct?'
    ]).subscribe((resp: any) => {
      this.helpersService
        .showAlert(resp.Accept, resp['The information is correct?'])
        .then(() =>
          this.router.navigate(['collect-codi', 'generate-qr'], { queryParams: this.formGroup.value })
        );
    });
  }

}
