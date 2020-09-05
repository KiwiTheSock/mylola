//Angular
import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Ionic
import { AlertController, IonList, IonRouterOutlet, LoadingController, ModalController, ToastController, Config } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';

//Ionic-Native
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

//Others
import { ConferenceData } from '../../services/conference-data';
import { UserData } from '../../services/user-data';
import { Darkmode } from '../../services/darkmode';
import { Refresher } from '../../services/refresher';

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
  styleUrls: ['./favorites.scss']
})
export class FavoritesPage implements OnInit {

  //ToDo
  @ViewChild('scheduleList', { static: true }) scheduleList: IonList;

  //Filter (ToDo)
  tracks: { name: string, icon: string, isChecked: boolean }[] = [];

  //Data (ToDo)
  dayIndex = 0;
  queryText = '';
  segment = 'favorites';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  showSearchbar: boolean;

  //Create Coupon 
  text: string = 'Mylola';
  link: string = 'https://www.mylola.de/';

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
    public darkmode: Darkmode,
    public refresher: Refresher,
    private socialSharing: SocialSharing
  ) { }

  ngOnInit() {
    this.updateSchedule();
  }

  ngDoCheck() {
    this.updateSchedule();
  }

  /* Update Timeline (ToDO)
   * --------------------------------------------------------
   */
  updateSchedule() {
    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
    });
  }

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
  }

  /* Filter (ToDo)
   * --------------------------------------------------------
   */
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
      this.excludeTracks.pop("Gastro & Nightlife");
    }

    if (name == 2) {
      this.excludeTracks.pop("Shopping");
    }

    if (name == 3) {
      this.excludeTracks.pop("Freizeit & Erleben");
    }

    if (name == 4) {
      this.excludeTracks.pop("Dienstleistungen");
    }

    if (name == 5) {
      console.log("Button 5 Dismiss");
    }

    if (name == 6) {
      console.log("Button 6 Dismiss");
    }

    this.updateSchedule();
  }

  btnActivate(ionicButton, name) {
    //Design
    if (ionicButton.color === 'danger') {
      ionicButton.color = 'medium';
      this.applyFilter(name);
    }
    else {
      ionicButton.color = 'danger';
      this.dismissFilter(name);
    }
  }

  /* Favorites (ToDo)
   * --------------------------------------------------------
   */
  toggleFavorite(session: any) {
    if (this.user.hasFavorite(session.name)) {
      this.user.removeFavorite(session.name);
      session.fav = true;
    } else {
      this.user.addFavorite(session.name);
      session.fav = false;
    }
  }

  /* Share (ToDo)
   * --------------------------------------------------------
   */
  shareSession(session: any) {
    this.socialSharing.share(session.text, 'MEDIUM', null, session.facebook);
  }

  /* Refresher (ToDo)
   * --------------------------------------------------------
   */
  refresh() {
    this.refresher.doRefresh(event);
  }
}