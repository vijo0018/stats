import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {StatsService} from "../../providers/stats-data";
import {NewsScraping} from "../../providers/news-scraping";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  csNews: any;
  newsTitle: any;
  images:any;
  singleArray = [];
  recentNews = [];

  isLoading = true;

  hltvLinks:any;
  hltvTitle:any;
  img:any;
  simpleArray = [];

  wasClicked = false;
  wasClickedCom = false;

  constructor(public navCtrl: NavController, public statsService: StatsService, private newScrapingService: NewsScraping) {

    }

    ngOnInit(){
      this.isLoading = true;
      this.newScrapingService.getHltvNews().subscribe(data => {
        this.hltvLinks = data.linkData;
        this.hltvTitle = data.titleText;
        this.recentNews = data.newsRecent;
        this.img = data.images;


        for(let i = 0; i < this.hltvLinks.length; i++){
        this.simpleArray.push({
          link: this.hltvLinks[i],
          title: this.hltvTitle[i],
          image: this.img[i],
          recent: this.recentNews[i]

        })
      }
      });


      this.newScrapingService.getRedditNews().subscribe(data => {
        this.csNews = data.csDataNews;
        this.newsTitle = data.urlTitleText;
        this.images = data.img;


        for(let i = 0; i < this.csNews.length; i++) {
          this.singleArray.push({
            link: this.csNews[i],
            title: this.newsTitle[i],
            image: this.images[i]
          });
        }
        this.isLoading = false;
      });
    }
    moreInfo(){
  this.wasClicked = !this.wasClicked;
}
  moreInfoCom(){
    this.wasClickedCom = !this.wasClickedCom;
  }

}



//console.log(data.csData.playerstats.stats)); this.statsService.getFromNodejs().subscribe(data => this.stats = data.csData.playerstats.stats);

