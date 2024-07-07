import { Injectable } from '@angular/core';
import { Config } from '../configurations/app.configurations';
@Injectable({
  providedIn: 'root'
})
export class URLService {

    constructor() { }
  
    getURL = (location: string): string => {
      return `${Config.base_url}/${location}`;
    }
}