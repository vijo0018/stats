import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';


@Injectable()
export class StatsService {

  constructor(private http: Http) { }

  getFromNodejs() {
    return this.http.get('http://localhost:3000/cs')
      .map(res => res.json());
  }

  getNewsFromNodejs() {
    return this.http.get('http://localhost:3000/news')
      .map(res => res.json());
  }

  getPlayersum(){
    return this.http.get('http://localhost:3000/playerSum')
      .map(res => res.json());
  }

  getAchieve(){
    return this.http.get('http://localhost:3000/achieve')
      .map(res => res.json());
  }

  getPlayerStatus(){
    return this.http.get('http://localhost:3000/playerStatus')
      .map(res => res.json());
  }
}
