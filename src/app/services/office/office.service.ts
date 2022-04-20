import { Injectable } from '@angular/core';
import { ENDPOINTS } from '@globals/endpoints';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

ENDPOINTS

@Injectable({
  providedIn: 'root'
})
export class OfficeService {

  constructor(private httpClient: HttpClient) { }

  postNearOffices(latitude: number, longitude: number): Observable<any> {
    return this.httpClient.post(`${ENDPOINTS.office}/nearest`, {latitude,longitude});
  }
}
