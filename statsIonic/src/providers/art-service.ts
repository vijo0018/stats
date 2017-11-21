import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ArtService {


  constructor(public http: Http) {
    console.log('Hello VideoService Provider');
  }
//

  getCsArt() {
    return this.http.get('http://localhost:3000/ImageScrape')
      .map(res => res.json());
  }
  getRecentArt(){
      return this.http.get('http://localhost:3000/RecentArtScrape')
        .map(res => res.json());

  }
  getTopArt(){
    return this.http.get('http://localhost:3000/TopArtScrape')
      .map(res => res.json());

  }

}
