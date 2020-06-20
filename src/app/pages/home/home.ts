import { Component, ViewChild, OnInit} from '@angular/core';
import { IonList, Config } from '@ionic/angular';
import { ConferenceData } from '../../providers/conference-data';
import { Darkmode } from '../../providers/darkmode';
import { Refresher } from '../../providers/refresher';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: ['./home.scss'],
})
export class HomePage implements OnInit {
  // Gets a reference to the list element
  @ViewChild('scheduleList', { static: true }) scheduleList: IonList;

  //Timeline
  ios: boolean;
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  showSearchbar: boolean;

  constructor(
    public confData: ConferenceData,
    public config: Config,
    public darkmode: Darkmode,
    public refresher: Refresher,
  ) { }

  ngOnInit() {
    this.updateSchedule();
    this.ios = this.config.get('mode') === 'ios';
  }

  ngDoCheck(){
    console.log("Home");
    this.updateSchedule();
  }

  //Update timeline
  updateSchedule() {
    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
    });
  }

  //Refresh
  refresh(){
    this.refresher.doRefresh(event);
  }
}
