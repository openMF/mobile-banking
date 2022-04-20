import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENDPOINTS } from '@globals/endpoints';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SavingsaccountsService {

  constructor(private httpClient: HttpClient) { }

  public createPayOrder(accountId: string, form: any): Observable<any> {
    return this.httpClient.post(`${ENDPOINTS.savingsAccounts}/${accountId}/transactions`, form, {
      params: {
        command: 'createPayOrder'
      }
    });
  }

  public getPayOrders(accountId: string) {
    return this.httpClient.get(`${ENDPOINTS.savingsAccounts}/${accountId}/payorders`).pipe(
      map( (data: any[]) => data.map( item => ({...item, accountId}) ) )
    );
  }

  public cancelPayOrder(accountId: string, form: any) {
    return this.httpClient.post(`${ENDPOINTS.savingsAccounts}/${accountId}/transactions`, form, {
      params: {
        command: 'deletePayOrder'
      }
    });
  }

}
