//Angular
import { Component, ViewChild } from '@angular/core';

//Ionic
import { IonTabs } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'tabs-page.html',
  styleUrls: ['./tabs-page.scss']
})
export class TabsPage {

  @ViewChild('myTabs') tabs: IonTabs;
  color1 = "";
  color2 = "";
  color3 = "";
  red = "primary";
  grey = "medium";

  constructor(
    private router: Router
  ) { }

  /* Select Tab
   * --------------------------------------------------------
   */
  getSelectedTab() {
    if (!this.router.url.includes("detail")) {
      if (this.tabs.getSelected() == "home") {
        this.color1 = this.red;
        this.color2 = this.grey;
        this.color3 = this.grey;
        this.tabs.select("home");
      } else if (this.tabs.getSelected() == "favorites") {
        this.color1 = this.grey;
        this.color2 = this.red;
        this.color3 = this.grey;
        this.tabs.select("favorites");
      } else if (this.tabs.getSelected() == "events") {
        this.color1 = this.grey;
        this.color2 = this.grey;
        this.color3 = this.red;
        this.tabs.select("events");
      }
    } else {
      this.color1 = this.red;
      this.color2 = this.grey;
      this.color3 = this.grey;
    }
  }

  /* First Tab
   * --------------------------------------------------------
   */
  tab1(icon, label) {
    icon.color = this.color1;
    label.color = this.color1;
  }

  /* Second Tab
   * --------------------------------------------------------
   */
  tab2(icon, label) {
    icon.color = this.color2;
    label.color = this.color2;
  }

  /* Third Tab
   * --------------------------------------------------------
   */
  tab3(icon, label) {
    icon.color = this.color3;
    label.color = this.color3;
  }

  /* Home Tab
  * --------------------------------------------------------
  */
  home() {
    this.tabs.select("home");
    this.getSelectedTab();
  }

}