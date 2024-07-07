import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { URLService } from '../services/url.service';

@Injectable({
  providedIn: 'root',
})
export class MinesManager {
  constructor(private http: HttpClient, private urlService: URLService) {}

  getMainsConfig = (): Observable<{
    data: { [key: string]: number };
    success: boolean;
  }> => {
    return this.http.get(this.urlService.getURL('mines-config')) as Observable<{
      data: { [key: string]: number };
      success: boolean;
    }>;
  };

  saveConfigurations = (data: {
    [key: string]: number;
  }): Observable<{
    success: boolean;
    data?: { [key: string]: number };
  }> => {
    return this.http.post(
      this.urlService.getURL('mines-config'),
      data
    ) as Observable<{ success: boolean; data?: { [key: string]: number } }>;
  };
}
