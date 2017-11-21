import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import {Stats} from "../stats/stats";
import {Artpage} from "../artpage/artpage";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = Stats;
  tab3Root = Artpage;

  constructor() {

  }
}
