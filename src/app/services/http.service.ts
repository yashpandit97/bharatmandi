import { Injectable } from '@angular/core';
import { POST_DATA } from '../mockData/mockDataFile';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  getPostData(){
    return from(new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(POST_DATA);
      }, 1000);
    })).toPromise();
  }
}
