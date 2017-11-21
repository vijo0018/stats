import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams} from 'ionic-angular';
import {NgForm} from  "@angular/forms";
import{FbAuth} from "../../providers/fb-auth"

/**
 * Generated class for the Fbsignin page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-fbsignin',
  templateUrl: 'fbsignin.html',
})
export class Fbsignin {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private fbAuth: FbAuth,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
  }
  onSignin(form: NgForm){
    const loading = this.loadingCtrl.create({
      content: 'Signing you in'
    });
    loading.present();
    this.fbAuth.signin(form.value.email, form.value.password)
      .then(data=>{
        loading.dismiss();
      }).catch(error =>{
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: 'Signin failed!',
        message: error.message,
        buttons: ['Ok']
      });
      alert.present();
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Fbsignin');
  }

}
