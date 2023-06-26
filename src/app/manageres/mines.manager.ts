import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { URLService } from '../services/url.service';

@Injectable({
  providedIn: 'root'
})
export class MinesManager {
    constructor(
        private http: HttpClient,
        private urlService: URLService
    ) { }
  
    getMainsConfig = (): Observable<any> => {
      return this.http.get(this.urlService.getURL('mines-config'));
    }
  
    saveConfigurations = (data: any): Observable<any> => {
      return this.http.post(this.urlService.getURL('mines-config'), data);
    }
}