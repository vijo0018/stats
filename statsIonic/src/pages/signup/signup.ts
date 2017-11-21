import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController} from 'ionic-angular';
import {Authenticater} from "../../providers/authenticater";

@Component({
  selector: 'page-contact',
  templateUrl: 'signup.html'
})
export class SignUpPage {

  newcreds;

  constructor(public navCtrl: NavController,
              private auth: Authenticater,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {
    this.newcreds ={
      name:'',
      password:''
    }
  }
  onSignup(user) {
    const loading = this.loadingCtrl.create({
      content:'Signing you up...'
    });
    loading.present();
    this.auth.adduser(user).then(data => {
      loading.dismiss();
      if(data) {
        let alert = this.alertCtrl.create({
          title: 'Success',
          subTitle: 'User Created',
          buttons: ['ok']
        });
        alert.present();
      }
    });
  }
}
