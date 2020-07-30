import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList, IonRouterOutlet, LoadingController, ModalController, ToastController, Config } from '@ionic/angular';
import { FavoritesFilterPage } from '../favorites-filter/favorites-filter';
import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';
import { PopoverController } from '@ionic/angular';
import { PopoverPage } from '../popover/popover';
import { Darkmode } from '../../providers/darkmode';
import { Refresher } from '../../providers/refresher';

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
  styleUrls: ['./favorites.scss']
})
export class FavoritesPage implements OnInit{
  // Gets a reference to the list element
  @ViewChild('scheduleList', { static: true }) scheduleList: IonList;

  tracks: { name: string, icon: string, isChecked: boolean }[] = [];

  ios: boolean;
  dayIndex = 0;
  queryText = '';
  segment = 'favorites';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  showSearchbar: boolean;

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
    ) {}

    ngOnInit() {
      this.updateSchedule();
  
      this.ios = this.config.get('mode') === 'ios';
    }

    ngDoCheck(){
      this.updateSchedule();
    }
    
    //Update Timeline
    updateSchedule() {
      this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
        this.shownSessions = data.shownSessions;
        this.groups = data.groups;
      });
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

  dismissFilter(name){

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

    //Popover
  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event
    });
    await popover.present();
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
  shareSession() {
    console.log('Clicked share session');
  }

    //Refresh
    refresh(){
      this.refresher.doRefresh(event);
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
}