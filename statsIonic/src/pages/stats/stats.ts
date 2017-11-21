import {Component} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {StatsService} from "../../providers/stats-data";
import {Authenticater} from "../../providers/authenticater";

/**
 * Generated class for the Stats page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class Stats {

  constructor(public navCtrl: NavController, public statsService: StatsService, private auth: Authenticater, private alertCtrl: AlertController) {
  }
  csStats: any[];
  achieve: any[];
  totalKills = [];
  totalDeaths = [];
  pieArray = [this.totalDeaths, this.totalKills ];
  isLoaded = false;
  a:number; // kills
  b:number; // deaths
  c:number; // kda
  totalTime:number;
  cash:number;
  headshot:number;
  tWins:number;
  ctWins:number;
  RecentTotalWins:number;

  lastWins:number;
  lastKillsData = [];
  lastDeathsData = [];
  lastPieArray = [this.lastDeathsData, this.lastKillsData];
  lastKills:number;
  lastDeaths:number;
  lastDamage:number;
  lastMoneySpent:number;
  lastMvp:number;
  lastKdr:number;

  vacRecord:any;
  playerSummary:any;
  achievementImage:any;

  wasClicked = false;

  ngOnInit() {
    this.csStats = null;
    this.statsService.getFromNodejs().subscribe(data => {
      this.csStats = data.csData.playerstats.stats;
      this.achieve = data.csData.playerstats.achievements;
      this.fillArrays(); this.timePlayed(); this.moneyEarned(); this.headshotProcent(); this.lastMatch();this.allAchivement();

    });
    this.statsService.getAchieve().subscribe(data => {
      this.achievementImage = data.achieveImg.game.availableGameStats.achievements;
    });
    this.statsService.getPlayerStatus().subscribe(data =>{
      this.vacRecord = data.playerStatus.players;
    });
    this.statsService.getPlayersum().subscribe(data => {
      this.playerSummary = data.playerSum.response.players;
    })

  }


hits:number;
  fire:number;
  accuracy:number;


  fillArrays() {
    for (let item of this.csStats) {
      if (item.name == 'total_kills') {
        this.totalKills.push(item.value);
        this.a = item.value;
      }
      if(item.name == 'total_deaths'){
        this.totalDeaths.push(item.value);
        this.b = item.value;
      }
      if(item.name == 'total_shots_hit'){
        this.hits = item.value;
      }
      if(item.name == 'total_shots_fired'){
        this.fire = item.value;
      }
      if(item.name == 'total_shots_fired'){
        this.fire = item.value;
      }
      if(item.name == 'total_shots_fired'){
        this.fire = item.value;
      }
      if(item.name == 'total_shots_fired'){
        this.fire = item.value;
      }
      if(item.name == 'total_shots_fired'){
        this.fire = item.value;
      }
      if(item.name == 'total_shots_fired'){
        this.fire = item.value;
      }
      if(item.name == 'total_shots_fired'){
        this.fire = item.value;
      }
      this.isLoaded = true
    }
    this.c = this.a/this.b;
    this.accuracy = (this.hits/this.fire);
    console.log('Total Kills', this.totalKills);
    console.log('Total Deaths', this.totalDeaths);
    console.log('Total Kills to count', this.a);
    console.log('Total Deaths to count', this.b);
  }

timePlayed(){
  for (let item of this.csStats) {
    if(item.name == 'total_time_played'){
     this.totalTime = (item.value/3600)*1.5407;
    }
  }
  console.log('total hours ',this.totalTime);
}
  moneyEarned(){
    for (let item of this.csStats) {
      if(item.name == 'total_money_earned'){
        this.cash = item.value;
      }
    }
    console.log('one milli one milli total cash',this.cash);
  }

  headshotProcent(){
    for (let item of this.csStats) {
      if(item.name == 'total_kills_headshot'){
        this.headshot = (item.value/this.a);
      }
    }
    console.log('hs precent',this.headshot);
  }

  lastMatch(){
    for (let item of this.csStats) {
      if(item.name == 'last_match_t_wins'){
        this.tWins = item.value;
      }
      if(item.name == 'last_match_ct_wins'){
        this.ctWins = item.value;
      }
      if(item.name == 'last_match_wins'){
        this.lastWins = item.value;
      }
      if(item.name == 'last_match_kills'){
        this.lastKillsData.push(item.value);
        this.lastKills = item.value;
      }
      if(item.name == 'last_match_deaths'){
        this.lastDeathsData.push(item.value);
        this.lastDeaths = item.value;
      }
      if(item.name == 'last_match_damage'){
        this.lastDamage = item.value;
      }
      if(item.name == 'last_match_money_spent'){
        this.lastMoneySpent = item.value;
      }
      if(item.name == 'last_match_mvps'){
        this.lastMvp = item.value;
      }

      this.RecentTotalWins = this.tWins+this.ctWins;
      this.lastKdr = this.lastKills/this.lastDeaths;
      this.isLoaded = true
    }
    console.log("recent ",this.RecentTotalWins);
  }

  allAchivement(){
    for (let item of this.achieve) {
      if(item.achieved == '1'){
        this.achieve.push(item.name);
      }
    }
  }

  public LatestPieChartData:any[] = [this.lastPieArray];

  chartOptions: any = {
  scaleShowVerticalLines: false,
  responsive: true
};

  chartLabels: string[] = ['Test 1', 'Test 2', 'Test 3', 'Test 4'];
  chartType: string = 'bar';
  chartLegend: boolean = true;

  chartData: any[] = [
    { data: [75, 80, 45, 100], label: 'Student A' },
    { data: [80, 55, 75, 95], label: 'Student B' }
  ];

  // Pie
  public pieChartData:any[] =  [this.pieArray];


  public pieChartOptions: any = {
    responsive: true,
    animationEasing: "easeInOutElastic",
    legend: {display: false},
    tooltipEvents: [],
    showTooltips: true,
    tooltipCaretSize: 0,

  };

  public pieChartLabels: string[] = ['Total Deaths', 'Total Kills'];
  public pieChartType: string = 'doughnut';


  public pieChartColors: Array<any> = [{backgroundColor: ["#8a000e", "#062148"]} ];

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  moreInfo(){
    this.wasClicked = !this.wasClicked;
  }

  getinfo() {
    this.auth.getinfo().then(data => {
      if(data) {
        let alert = this.alertCtrl.create({
          title: 'Success',
          subTitle: 'Funkar',
          buttons: ['ok']
        });
        alert.present(alert);
      }

    })

  }
}


