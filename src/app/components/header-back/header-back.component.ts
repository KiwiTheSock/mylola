import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-header-back',
  templateUrl: './header-back.component.html',
  styleUrls: ['./header-back.component.scss'],
})
export class HeaderBackComponent implements OnInit {

  ios: boolean;
  defaultHref = "";

  constructor(
    private platform: Platform
  ) { }

  ngOnInit() {
    if(this.platform.platforms().includes("ios")){
      this.ios = true;
    }
    else {
      this.ios = false;
    }
  }

}
