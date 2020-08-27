//Angular
import { Component, ViewChild } from '@angular/core';

//Ionic
import { IonTabs } from '@ionic/angular';

@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {

  @ViewChild('myTabs') tabs: IonTabs;

  color1 = "";
  color2 = "";
  color3 = "";
  red = "#DB001B";  //primary
  grey = "#909090"; //Kompromiss Darkmode/Lightmode

  constructor(
  ) {}

  getSelectedTab() {
    if(this.tabs.getSelected() == "home"){
      this.color1 = this.red;
      this.color2 = this.grey;
      this.color3 = this.grey;
      this.tabs.select("home");
    } else if(this.tabs.getSelected() == "favorites") {
      this.color1 = this.grey;
      this.color2 = this.red;
      this.color3 = this.grey;
      this.tabs.select("favorites");
    } else if(this.tabs.getSelected() == "events") {
      this.color1 = this.grey;
      this.color2 = this.grey;
      this.color3 = this.red;
      this.tabs.select("events");
    }
  }

  tab1() {
    return {
      'color': this.color1
    };
  }

  tab2() {
    return {
      'color': this.color2
    };
  }

  tab3() {
    return {
      'color': this.color3
    };
  }

  home(){
    this.tabs.select("home");
    this.getSelectedTab();
  }

}