import { Component, ViewChild, OnInit, Renderer2, Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, IonList, IonRouterOutlet, LoadingController, ModalController, ToastController, Config, NavParams } from '@ionic/angular';
import { HomeFilterPage } from '../home-filter/home-filter';
import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';
import { PopoverController } from '@ionic/angular';
import { PopoverPage } from '../popover/popover';
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
  lastY = 0;

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
    public navParams: NavParams
  ) { }

  ngOnInit() {
    this.updateSchedule();
    this.ios = this.config.get('mode') === 'ios';
  }

  ngDoCheck(){
    this.updateSchedule();
  }

  //Update timeline
  updateSchedule() {
    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
    });
  }

  //Filter
  async presentFilter() {
    const modal = await this.modalCtrl.create({
      component: HomeFilterPage,
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

  btnActivate(ionicButton) {
    if(ionicButton.color === 'medium')
      ionicButton.color =  'danger';
    else
      ionicButton.color = 'medium';
  }
}
