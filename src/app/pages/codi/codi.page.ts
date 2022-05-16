import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { ToastController } from '@ionic/angular';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-codi',
  templateUrl: './codi.page.html',
  styleUrls: ['./codi.page.scss'],
})
export class CodiPage implements OnInit {

  codiForm: FormGroup;
  //-----------------
  qrData = "Banco del Bienestar";
  scannedCode = null;
  elementType: 'url' | 'canvas' | 'img' = 'canvas';

  hasWriteAccess: boolean = false;
  //-----------------

  constructor(public formBuilder: FormBuilder, 
              private barcodeScanner: BarcodeScanner, 
            /**/  private base64ToGallery: Base64ToGallery,
              private toastCtrl:ToastController,
              private androidPermissions: AndroidPermissions) { 

                this.checkPermissions();  

    this.codiForm = formBuilder.group({
      payment: ["", Validators.compose([
        Validators.required, 
        Validators.minLength(9),
        Validators.pattern('[0-9]')
      ])],
      concept: ["", Validators.compose([
        Validators.required, 
        Validators.minLength(3),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])],
      reference: ["", Validators.compose([
        Validators.required, 
        Validators.minLength(3),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])]
  });

  }

  ngOnInit() {

  }

  
  createQr(){
   /* this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE,"Hola Mundo").then((data)=>{
      alert(JSON.stringify(data));
    },(err)=>{
      alert(JSON.stringify(err));
    }) */
    this.qrData = this.codiForm.controls["payment"].value + 
    this.codiForm.controls["concept"].value +
    this.codiForm.controls["reference"].value
  }
/*
  //scan test
  scanCode() {
    this.barcodeScanner.scan()
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            alert(error);
        });
}
*/
scanCode(){
  this.barcodeScanner.scan()
        .then((result) => {
            console.log(result);
            this.scannedCode = result;
        })
        .catch((error) => {
            alert(error);
        });

}

downloadQr(){
  const canvas = document.querySelector('canvas') as HTMLCanvasElement;
  const imageData = canvas.toDataURL('image/jpeg').toString();
  console.log('data iamgeData: ',imageData);

  let data = imageData.split(',')[1];
  console.log("wtf",data);
  this.base64ToGallery['base64ToGallery'](data, { prefix: '_img', mediaScanner:true }).then(
    res => console.log('Saved image to gallery ', res),
    err => console.log('Error saving image to gallery ', err)
  );
}

checkPermissions() {
  this.androidPermissions
  .checkPermission(this.androidPermissions
  .PERMISSION.WRITE_EXTERNAL_STORAGE)
  .then((result) => {
   console.log('Has permission?',result.hasPermission);
   this.hasWriteAccess = result.hasPermission;
 },(err) => {
     this.androidPermissions
       .requestPermission(this.androidPermissions
       .PERMISSION.WRITE_EXTERNAL_STORAGE);
  });
  if (!this.hasWriteAccess) {
    this.androidPermissions
      .requestPermissions([this.androidPermissions
      .PERMISSION.WRITE_EXTERNAL_STORAGE]);
  }
}

}
