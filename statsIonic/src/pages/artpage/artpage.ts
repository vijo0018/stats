import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {ArtService} from "../../providers/art-service";

/**
 * Generated class for the Artpage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-artpage',
  templateUrl: 'artpage.html',
})
export class Artpage {


  csArt: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private artScraperService: ArtService, private loadingCtrl: LoadingController) {
  }
  ngOnInit() {

    this.csArt = null;
    this.artScraperService.getRecentArt().subscribe(data => this.csArt = data.recentArt);
    this.updateRecent();
    this.updatePopular();
    this.updateTop();

}

  updateRecent(){

    this.artScraperService.getRecentArt().subscribe(data => this.csArt = data.recentArt);

  }
  updatePopular(){

    this.artScraperService.getCsArt().subscribe(data => this.csArt = data.csgoArt);

  }
  updateTop(){

    this.artScraperService.getTopArt().subscribe(data => this.csArt = data.TopArt);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Artpage');
  }

}
