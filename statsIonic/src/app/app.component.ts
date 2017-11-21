import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import {SigninPage} from "../pages/signin/signin";
import {SignUpPage} from "../pages/signup/signup";
import {Authenticater} from "../providers/authenticater";
import {EventsPage} from "../pages/events/events";
import firebase from 'firebase';
import {Fbsignup} from "../pages/fbsignup/fbsignup";
import {Fbsignin} from "../pages/fbsignin/fbsignin";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  signinPage:any = SigninPage;
  signupPage:any = SignUpPage;
  fbsignup:any = Fbsignup;
  fbsignin:any = Fbsignin;
  tabspage:any = TabsPage;
  isAuthed = false;
  activePage:any;

  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private menuCtrl: MenuController,
              private auth: Authenticater) {

    firebase.initializeApp({
      apiKey: "AIzaSyD4JSUT44UelFayTQNFRrhPPW3mlomu05k",
      authDomain: "stats-6944e.firebaseapp.com",
    });

    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        this.isAuthed = true;
        this.nav.setRoot(this.tabspage);
      }else{
        this.isAuthed = false;
        this.nav.setRoot(this.fbsignin);
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }

pages: Array<{title: string, component:any, icon: string}>;
  ngOnInit() {
    this.isAuthed = this.auth.isAuthenticated();
    this.auth.authListener.subscribe(data => {
      this.isAuthed = data; });

    this.pages = [
      {title: 'Home', component: TabsPage, icon:"home"},
      {title: 'Event', component: EventsPage, icon:"people"},
    ];
    this.activePage = this.pages[0];


    if(this.isAuthed == true){
      this.rootPage = TabsPage;
    }if(this.isAuthed == false){
      this.rootPage = SigninPage;
    }
  }



  onLoadPage(paged: any){
    this.nav.setRoot(paged);
    this.activePage = paged;
    this.menuCtrl.close();
  }

  onLoad(page: any){
    this.nav.setRoot(page.component);
    this.activePage = page;
    this.menuCtrl.close();
  }
  checkActive(page){
  return page == this.activePage;
}
  onLogout(){
    this.auth.logout();
    this.auth.isAuthenticated();
    this.nav.setRoot(SigninPage);
    this.menuCtrl.close();
  }
}
