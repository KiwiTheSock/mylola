import { Component, ViewChild, OnInit, Renderer2, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, IonList, IonRouterOutlet, LoadingController, ModalController, ToastController, Config, NavParams, IonInfiniteScroll, Platform } from '@ionic/angular';
import { ConferenceData } from '../../services/conference-data';
import { UserData } from '../../services/user-data';
import { PopoverController } from '@ionic/angular';
import { Darkmode } from '../../services/darkmode';
import { Refresher } from '../../services/refresher';
import { AuthService } from '../../services/auth.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { TabsPage } from '../tabs-page/tabs-page';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: ['./home.scss'],
})
export class HomePage implements OnInit {
  // Gets a reference to the list element
  @ViewChild('scheduleList', { static: true }) scheduleList: IonList;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  tracks: { name: string, icon: string, isChecked: boolean }[] = [];

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
  lastY = 0;

  page = 0;
  maximumPages = 5;

  text: string='Mylola ... teilen ... bla bla';
  link: string='https://www.mylola.de/';

  //API Test
  data: any

  constructor(
    public alertCtrl: AlertController,
    public confData: ConferenceData,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public toastCtrl: ToastController,
    public user: UserData,
    public config: Config,
    public popoverCtrl: PopoverController,
    private route: ActivatedRoute,
    public darkmode: Darkmode,
    public refresher: Refresher,
    private renderer: Renderer2,
    public navParams: NavParams,
    private authService: AuthService,
    private socialSharing: SocialSharing,
    private platform: Platform,
    private tabs: TabsPage,
    public apiService: ApiService,
  ) {
    this.data = [];
   }

  ngOnInit() {
    this.updateSchedule();

    //API TEST
    this.apiService.login().subscribe(response => {
      console.log(response);
      this.data = response;
    })  
  }

  ngDoCheck() {
    this.updateSchedule();
  }

  //Filter
  ionViewWillEnter() {
    this.confData.getTracks().subscribe((tracks: any[]) => {
      tracks.forEach(track => {
        this.tracks.push({
          name: track.name,
          icon: track.icon,
          isChecked: (this.excludeTracks.indexOf(track.name) === -1)
        });
      });
    });

    this.tabs.home();
  }

  applyFilter(name) {

    if (name == 1) {
      this.excludeTracks.push("Gastro & Nightlife");
    }

    if (name == 2) {
      this.excludeTracks.push("Shopping");
    }

    if (name == 3) {
      this.excludeTracks.push("Freizeit & Erleben");
    }

    if (name == 4) {
      this.excludeTracks.push("Dienstleistungen");
    }

    if (name == 5) {
      console.log("Button 5 Apply");
    }

    if (name == 6) {
      console.log("Button 6 Apply");
    }
    this.updateSchedule();
  }

  dismissFilter(name) {

    if (name == 1) {
      //this.excludeTracks.pop("Gastro & Nightlife");
      this.excludeTracks.forEach((value, index) => {
        if (value == "Gastro & Nightlife") {
          this.excludeTracks.splice(index, 1);
        }
      });
    }

    if (name == 2) {
      //this.excludeTracks.pop("Shopping");
      this.excludeTracks.forEach((value, index) => {
        if (value == "Shopping") {
          this.excludeTracks.splice(index, 1);
        }
      });
    }

    if (name == 3) {
      //this.excludeTracks.pop("Freizeit & Erleben");
      this.excludeTracks.forEach((value, index) => {
        if (value == "Freizeit & Erleben") {
          this.excludeTracks.splice(index, 1);
        }
      });
    }


    if (name == 4) {
      //this.excludeTracks.pop("Dienstleistungen");
      this.excludeTracks.forEach((value, index) => {
        if (value == "Dienstleistungen") {
          this.excludeTracks.splice(index, 1);
        }
      });
    }

    if (name == 5) {
      console.log("Button 5 Dismiss");
    }

    if (name == 6) {
      console.log("Button 6 Dismiss");
    }

    this.updateSchedule();
  }

  //Update timeline
  updateSchedule() {
    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
    });
  }

  loadMore(infiniteScroll) {
    this.page++;

    //insert function here

    console.log('Page: ', this.page);

    if (this.page === this.maximumPages) {
      this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    }
  }

  //Favorites
  toggleFavorite(session: any) {
    if (this.user.hasFavorite(session.name)) {
      this.user.removeFavorite(session.name);
      session.fav = true;
    } else {
      this.user.addFavorite(session.name);
      session.fav = false;
    }
  }

  //Share
  shareSession(session: any) {
    const url = this.link;
    const text = 'Test'+'\n';
    this.socialSharing.share(text, 'MEDIUM', null, session.facebook);
  }

  //Refresh
  refresh() {
    this.refresher.doRefresh(event);
  }

  btnActivate(ionicButton, name) {

    //Design
    if (ionicButton.color === 'primary') {
      ionicButton.color = 'medium';
      this.applyFilter(name);
    }
    else {
      ionicButton.color = 'primary';
      this.dismissFilter(name);
    }
  }

}
