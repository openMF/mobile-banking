import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENDPOINTS } from '@globals/endpoints';
import { Beneficiarie } from '@globals/interfaces/beneficiarie';
import { Programs } from '@pages/plan-social/plan-social.page';
import { Observable } from 'rxjs';
import { PersonalInfo } from '@globals/interfaces/personal-info';
import { Storage } from '@ionic/storage';
import { environment } from '@env';

interface NotificationBody {
  email?: string;
  subject: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public username: string;
  public password: string;
  public displayName: string;
  public shortName: string;
  public curp: string;
  public email: string;
  //public accountMovementsSelected: CardAccount;
  public beneficiaries: Beneficiarie[];
  public myAccounts: Beneficiarie[];
  public programaSocialSelected: Programs;

  constructor(private httpClient: HttpClient, private storage: Storage) { }

  public changeData(data: any) {
    return this.httpClient.put(`${ENDPOINTS.changeData}`, data);
  }

  public recoverPassword(data: any, type: 'request'|'renew'): Observable<any> {
    return this.httpClient.post(`${ENDPOINTS.password}/${type}`, data);
  }

  public sendSupportEmail(data: NotificationBody): Promise<any> {
    data.email = environment.supportEmail;
    
    return this.storage.get('personal-info').then( (personalInfo: PersonalInfo) => {
      
      const text = data.text;
      const subject = data.subject;
      data.subject = `SOPORTE BANCA MÓVIL - ${personalInfo.accountNo}`;

      data.text = `
        CLIENTE: ${personalInfo.displayName} <br>
        No. DE TELÉFONO: ${personalInfo.mobileNo} <br>
        No. DE CLIENTE: ${personalInfo.accountNo} <br><br>

        <b> ${ subject.toUpperCase() } </b> <br><br>

        ${ text.toUpperCase() } <br><br>
      `;

      return this.httpClient.post(`${ENDPOINTS.notification}`, data).toPromise();
    } );
  
    
  }
}
