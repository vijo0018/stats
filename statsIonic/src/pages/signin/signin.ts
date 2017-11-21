import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController} from 'ionic-angular';
import {Authenticater} from "../../providers/authenticater";
import {TabsPage} from "../tabs/tabs";

/**
 * Generated class for the Signin page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {


  usercreds;

  constructor(public navCtrl: NavController,
              public Auth: Authenticater,
              private loadingCtrl: LoadingController,
              private alertCtrl:AlertController) {


    this.usercreds = {
      name: '',
      password:''
    }

  }
  login(user){
    const loading = this.loadingCtrl.create({
    content:'Signing you in...'
  });
    loading.present();
    this.Auth.authenticate(user).then(data => {
      loading.dismiss();
      this.Auth.isAuthenticated();
      if(data){
        this.navCtrl.setRoot(TabsPage);
      }
    })
    .catch(error => {
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: 'Signup failed!',
        message: error.message,
        buttons: ['Ok']
      });
      alert.present();
    });
  }
}
