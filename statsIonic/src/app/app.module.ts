import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SignUpPage } from '../pages/signup/signup';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ChartsModule } from 'ng2-charts';
import '../../node_modules/chart.js/dist/Chart.bundle.min.js';
import {StatsService} from "../providers/stats-data";
import {JsonpModule, HttpModule} from "@angular/http";
import {Stats} from "../pages/stats/stats";
import {NewsScraping} from "../providers/news-scraping";
import {Authenticater} from "../providers/authenticater";
import {SigninPage} from "../pages/signin/signin";
import {ArtService} from "../providers/art-service";
import {Artpage} from "../pages/artpage/artpage";
import {EventService} from "../providers/event-service";
import {EventsPage} from "../pages/events/events";
import {LazyLoadImageModule} from "ng-lazyload-image";
import {FbAuth} from "../providers/fb-auth";
import {Fbsignup} from "../pages/fbsignup/fbsignup";
import {Fbsignin} from "../pages/fbsignin/fbsignin";




@NgModule({
  declarations: [
    MyApp,
    SignUpPage,
    HomePage,
    TabsPage,
    Stats,
    SigninPage,
    Artpage,
    EventsPage,
    Fbsignup,
    Fbsignin
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ChartsModule,
    JsonpModule,
    HttpModule,
    LazyLoadImageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignUpPage,
    HomePage,
    TabsPage,
    Stats,
    SigninPage,
    Artpage,
    EventsPage,
    Fbsignup,
    Fbsignin
  ],
  providers: [
    StatusBar,
    SplashScreen,
    StatsService,
    NewsScraping,
    Authenticater,
    ArtService,
    EventService,
    FbAuth,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
