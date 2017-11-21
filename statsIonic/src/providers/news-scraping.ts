import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the NewsScraping provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class NewsScraping {

  constructor(public http: Http) {
    console.log('Hello NewsScraping Provider');
  }

  getRedditNews() {
    return this.http.get('http://localhost:3000/scrape')
      .map(res => res.json());
  }

  getHltvNews() {
    return this.http.get('http://localhost:3000/hltvScrape')
      .map(res => res.json());
  }

}
