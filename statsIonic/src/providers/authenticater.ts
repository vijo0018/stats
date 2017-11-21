import {EventEmitter, Injectable, Output} from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Authenticater provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Authenticater {

AuthToken;
isLoggedin ;

  @Output() authListener: EventEmitter<any> = new EventEmitter();

  constructor(public http: Http) {
    console.log('Hello Authenticater Provider');
    this.AuthToken = null;
    this.isLoggedin = false;


  }
  storeUserCredentials(token) {
    window.localStorage.setItem('raja', token);
    this.useCredentials(token);

  }

  useCredentials(token) {
    this.isLoggedin = true;
    this.AuthToken = token;
  }

  loadUserCredentials() {
    let token = window.localStorage.getItem('raja');
    this.useCredentials(token);
  }

  destroyUserCredentials() {
    this.isLoggedin = false;
    this.AuthToken = null;
    window.localStorage.clear();
  }

  authenticate(user) {
    let creds = "name=" + user.name + "&password=" + user.password;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return new Promise(resolve => {
      this.http.post('http://localhost:3333/authenticate', creds, {headers: headers}).subscribe(data => {
        if(data.json().success){
          this.storeUserCredentials(data.json().token);
          resolve(true);
        }
        else
          resolve(false);
      });
    });
  }
  adduser(user) {
    let creds = "name=" + user.name + "&password=" + user.password;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return new Promise(resolve => {
      this.http.post('http://localhost:3333/adduser', creds, {headers: headers}).subscribe(data => {
        if(data.json().success){
          resolve(true);
        }
        else
          resolve(false);
      });
    });
  }

  getinfo() {
    return new Promise(resolve => {
      let headers = new Headers();
      this.loadUserCredentials();
      console.log(this.AuthToken);
      headers.append('Authorization', 'Bearer ' +this.AuthToken);
      this.http.get('http://localhost:3333/getinfo', {headers: headers}).subscribe(data => {
        if(data.json().success)
          resolve(data.json());
        else
          resolve(false);
      });
    })
  }
//Servicen
  isAuthenticated(){
    let isAuthed = localStorage.getItem('raja') !== null;
    this.authListener.emit(isAuthed);
    console.log(isAuthed);
    return isAuthed;
  }

  logout() {
    this.destroyUserCredentials();
  }
}

