import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import {EventService} from "../../providers/event-service";

/**
 * Generated class for the Events page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
event: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private eventService: EventService) {
    this.event = null;
    this.eventService.getEvents().subscribe(data => console.log(this.event = data.events));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Events');
  }


}
