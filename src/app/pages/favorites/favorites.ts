import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList, IonRouterOutlet, LoadingController, ModalController, ToastController, Config } from '@ionic/angular';
import { FavoritesFilterPage } from '../favorites-filter/favorites-filter';
import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
  styleUrls: ['./favorites.scss']
})
export class FavoritesPage implements OnInit{
  // Gets a reference to the list element
  @ViewChild('scheduleList', { static: true }) scheduleList: IonList;

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
    public config: Config
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
    async presentFilter() {
      const modal = await this.modalCtrl.create({
        component: FavoritesFilterPage,
        swipeToClose: true,
        presentingElement: this.routerOutlet.nativeEl,
        componentProps: { excludedTracks: this.excludeTracks }
      });
      await modal.present();
  
      const { data } = await modal.onWillDismiss();
      if (data) {
        this.excludeTracks = data;
        this.updateSchedule();
      }
    } 
}