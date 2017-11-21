import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams} from 'ionic-angular';
import {NgForm} from  "@angular/forms";
import{FbAuth} from "../../providers/fb-auth"

/**
 * Generated class for the Fbsignup page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-fbsignup',
  templateUrl: 'fbsignup.html',
})
export class Fbsignup {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private fbAuth: FbAuth,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
  }
onSignup(form: NgForm){
    const loading = this.loadingCtrl.create({
      content:'Signing you up...'
    });
    loading.present();
    this.fbAuth.signup(form.value.email, form.value.Password)
      .then(data => {
        loading.dismiss();
      })
      .catch(error =>{
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signup Failed!',
          message: error.message,
          buttons:['Ok']
        });
        alert.present();
      });

}
  ionViewDidLoad() {
    console.log('ionViewDidLoad Fbsignup');
  }

}
