import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase'

/*
  Generated class for the FbAuth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FbAuth {

  signup(email:string, password:string){
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  signin(email:string, password:string){
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
  logout(){
    firebase.auth().signOut();
  }
  constructor(public http: Http) {
  }
}
