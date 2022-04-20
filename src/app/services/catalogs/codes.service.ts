import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENDPOINTS } from '@globals/endpoints';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface BodyCep {
  CuentaBeneficiaria: string;
  CuentaOrdenante: string;
  ClaveDeRastreo: string;
  FechaOperacion: number;
  Monto: number;
}

@Injectable({
  providedIn: 'root'
})
export class CodesService {
  private httpWithoutInterceptors: HttpClient;

  constructor(private httpClient: HttpClient,
    private handler: HttpBackend,)
     {
      this.httpWithoutInterceptors = new HttpClient(this.handler);
    }

  public getFAQS(): Observable<any> {
    return this.httpClient.get(`${ENDPOINTS.codesOptions}/FAQS/options`).pipe(
      map( (data: any) => {
        return data.codeValues;
      } )
    );
  }

  public getMOBILE(): Observable<any> {
    return this.httpClient.get(`${ENDPOINTS.codesOptions}/MOBILE/options`).pipe(
      map( (data: any) => {
        let obj = {};        
        
        for (const key in data.codeValues) {
          const item = data.codeValues[key];
          obj[item.name] = item;
        }

        return obj;
      } )
    );
  }

  public getCep(data: BodyCep[]): Observable<any> {
    return this.httpClient.post(`${ENDPOINTS.cep}/cepurl`, data);
  }

  public getSTATES(): Observable<any> {
    let api_keys = environment.graviteeApiKeyapis;
      const httpOptions = {
        headers: new HttpHeaders({
          'X-Gravitee-Api-Key': `${api_keys}`
        })
      };
    return this.httpWithoutInterceptors.get(`${ENDPOINTS.codesOptionsapis}/STATE/options`,httpOptions).pipe(
      map( (data: any) => {
        return data.codeValues;
      } )
    );
  }
}
