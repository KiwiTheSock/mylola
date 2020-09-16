//Angular
import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

//Ionic
import { AlertController, IonList, IonRouterOutlet, LoadingController, ModalController, ToastController, Config, IonInfiniteScroll } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';

//Ionic-Native
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

//Others
import { ConferenceData } from '../../services/conference-data';
import { UserData } from '../../services/user-data';
import { Darkmode } from '../../services/darkmode';
import { Refresher } from '../../services/refresher';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
  styleUrls: ['./favorites.scss']
})
export class FavoritesPage implements OnInit {

  //Infinite Scroll
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  page = 0;
  maximumPages = 5;

  //Filter
  tracks: { name: string, icon: string, isChecked: boolean }[] = [];
  excludeTracks: any = [];

  //Old Data
  //dayIndex = 0;
  //queryText = '';
  //segment = 'favorites';
  //shownSessions: any = [];
  //groups: any = [];
  //confDate: string;

  //Search
  showSearchbar: boolean;

  //Data
  data: any;
  devaluations: any;
  isUsed: boolean = false;

  //Position
  lat = null;
  lng = null;

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
    private socialSharing: SocialSharing,
    public apiService: ApiService,
    private geo: Geolocation,
    private changeRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    //Filter
    this.confData.getTracks().subscribe((tracks: any[]) => {
      tracks.forEach(track => {
        this.tracks.push({
          name: track.name,
          icon: track.icon,
          isChecked: (this.excludeTracks.indexOf(track.name) === -1)
        });
      });
    });

    //Data
    this.apiService.getFavorite().subscribe((res: any) => {
      let jsonResult = JSON.parse(JSON.stringify(res));
      //console.log(jsonResult);

      //200 is an empty body
      if (jsonResult.body.status == 200) {
        this.data = "";
      }
      else {
        this.data = jsonResult.body;
      }
    })

    this.apiService.getDevaluationByIdentifier().subscribe((res: any) => {
      let jsonResult = JSON.parse(JSON.stringify(res));
      //console.log(jsonResult.body);
      this.devaluations = jsonResult.body;
    })
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

  /* Update Timeline (ToDO)
   * --------------------------------------------------------
   */
  updateSchedule() {
    /*
    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.groups = data.groups;
    });
    */
  }

  loadMore(infiniteScroll) {
    this.page++;

    //insert function here

    console.log('Page: ', this.page);

    if (this.page === this.maximumPages) {
      this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    }
  }

  /* Favorites
   * --------------------------------------------------------
   */
  toggleFavorite(coupon_id: number) {

    this.apiService.deFavorite(coupon_id).subscribe(res => {
      console.log(res);
      this.ngOnInit();
    })
  }

  /* Share
   * --------------------------------------------------------
   */
  shareSession() {
    this.socialSharing.share("https://www.mylola.de") // "/?angebot=" + id
  }

  //Refresh
  refresh(event) {
    console.log('Begin async operation');

    this.ngOnInit();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
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

  //Get Lng And Lat
  position() {
    this.geo.getCurrentPosition({
      timeout: 10000,
      enableHighAccuracy: false
    }).then(res => {
      this.lat = res.coords.latitude;
      this.lng = res.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    console.log("LNG: ", this.lng);
    console.log("LAT: ", this.lat);
  }
}