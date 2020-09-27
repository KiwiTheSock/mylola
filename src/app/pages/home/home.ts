//Angular
import { Component, ViewChild, OnInit, Renderer2, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//Ionic
import { AlertController, IonList, IonRouterOutlet, LoadingController, ModalController, ToastController, Config, NavParams, IonInfiniteScroll, Platform } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

//Ionic-Native
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

//Others
import { ConferenceData } from '../../services/conference-data';
import { UserData } from '../../services/user-data';
import { Darkmode } from '../../services/darkmode';
import { Refresher } from '../../services/refresher';
import { AuthService } from '../../services/auth.service';
import { TabsPage } from '../tabs-page/tabs-page';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: ['./home.scss'],
})
export class HomePage implements OnInit {

  //Infinite Scroll
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  //Filter
  tracks: { name: string, icon: string, isChecked: boolean }[] = [];
  excludeTracks: any = [];

  //Old Data
  //dayIndex = 0;
  //segment = 'all';
  //groups: any = [];
  //confDate: string;

  //Search
  showSearchbar: boolean;
  queryText = '';

  //Data
  public data = [];
  public filterdData;
  public counter: number = 0;
  public fav: boolean = false;

  //Position
  lat;
  lng;

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
    private geo: Geolocation,
    private storage: Storage,
  ) { }

  ngOnInit() {
    this.getData();
  }

  ionViewWillEnter() {
    //Home Tab
    this.tabs.home();
  }

  getData() {

    //Data
    this.apiService.getCoupons().subscribe((res: any) => {
      var jsonResult = JSON.parse(JSON.stringify(res));

      //console.log(jsonResult.body);

      //200 is an empty body
      if (jsonResult.body.status == 200) {
        //this.data = "";
      }
      else {

        var tmp = this.counter + 5;
        for (this.counter; this.counter < tmp; this.counter++) {
          if (jsonResult.body[this.counter]) {
            this.data.push(jsonResult.body[this.counter]);
          }
        }

      }
    });
  }

  /* Filter
   * --------------------------------------------------------
   */
  applyFilter(name) {

    if (name == 1) {
      this.excludeTracks.push("Gastro & Nightlife");
      this.updateFilter();
    }

    if (name == 2) {
      this.excludeTracks.push("Shopping");
      this.updateFilter();
    }

    if (name == 3) {
      this.excludeTracks.push("Freizeit & Erleben");
      this.updateFilter();
    }

    if (name == 4) {
      this.excludeTracks.push("Dienstleistungen");
      this.updateFilter();
    }

    if (name == 5) {
      this.excludeTracks.push("Position");
      this.position();
    }

    if (name == 6) {
      this.excludeTracks.push("Ending");
      this.ending();
    }

  }

  dismissFilter(name) {

    if (name == 1) {
      this.excludeTracks.forEach((value, index) => {
        if (value == "Gastro & Nightlife") {
          this.excludeTracks.splice(index, 1);
        }
      });
      this.updateFilter();
    }

    if (name == 2) {
      this.excludeTracks.forEach((value, index) => {
        if (value == "Shopping") {
          this.excludeTracks.splice(index, 1);
        }
      });
      this.updateFilter();
    }

    if (name == 3) {
      this.excludeTracks.forEach((value, index) => {
        if (value == "Freizeit & Erleben") {
          this.excludeTracks.splice(index, 1);
        }
      });
      this.updateFilter();
    }

    if (name == 4) {
      this.excludeTracks.forEach((value, index) => {
        if (value == "Dienstleistungen") {
          this.excludeTracks.splice(index, 1);
        }
      });
      this.updateFilter();
    }

    if (name == 5) {
      this.counter = 0;
      this.excludeTracks.forEach((value, index) => {
        if (value == "Position") {
          this.excludeTracks.splice(index, 1);
        }
      });
      let count = this.data.length;
      for (let i = 0; i < count; i++) {
        this.data.pop()
      }
      this.ngOnInit();
    }

    if (name == 6) {
      this.counter = 0;
      this.excludeTracks.forEach((value, index) => {
        if (value == "Ending") {
          this.excludeTracks.splice(index, 1);
        }
      });
      let count = this.data.length;
      for (let i = 0; i < count; i++) {
        this.data.pop()
      }
      this.ngOnInit();
    }
  }

  updateFilter() {
    this.counter = 0;
    if (this.excludeTracks != "") {
      this.apiService.filterByCategory(this.excludeTracks).subscribe((res: any) => {
        let count = this.data.length;
        for (let i = 0; i < count; i++) {
          this.data.pop()
        }
        var jsonResult = JSON.parse(JSON.stringify(res));
        this.data = jsonResult.body;
      })
    }
    else {
      let count = this.data.length;
      for (let i = 0; i < count; i++) {
        this.data.pop()
      }
      this.ngOnInit();
    }
  }

  //Get Lng And Lat
  async position() {
    this.geo.getCurrentPosition({
      timeout: 10000,
      enableHighAccuracy: false
    }).then(res => {
      this.lat = res.coords.latitude;
      this.lng = res.coords.longitude;
      //console.log("LNG: ", this.lng);
      //console.log("LAT: ", this.lat);
      this.apiService.filterByNearBy(this.lat, this.lng).subscribe(res => {

        this.data = null;
        var jsonResult = JSON.parse(JSON.stringify(res));
        this.data = jsonResult.body;

      })
    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

  ending() {
    this.apiService.filterByEnding().subscribe((res: any) => {
      this.data = null;
      var jsonResult = JSON.parse(JSON.stringify(res));
      this.data = jsonResult.body;
    },
      error => {
        this.data = [];
      })
  }

  //Search
  filterItems() {
    if (this.queryText == "") {
      this.apiService.getCoupons().subscribe((res: any) => {
        var jsonResult = JSON.parse(JSON.stringify(res));
        this.data = jsonResult.body;
      });
    } else {
      this.apiService.search(this.queryText).subscribe((result: any) => {
        var jsonResult = JSON.parse(JSON.stringify(result));
        this.data = jsonResult.body;
      }, (error: any) => {
        this.data = null;
      });
    }
  }

  /* Infinite Scrolling
   * --------------------------------------------------------
   */
  loadData(event) {

    if (this.queryText != "") {
      event.target.complete();
    }
    else if (this.excludeTracks.includes("Gastro & Nightlife") || this.excludeTracks.includes("Shopping") || this.excludeTracks.includes("Freizeit & Erleben") || this.excludeTracks.includes("Dienstleistungen")) {
      event.target.complete();
    }
    else if (this.excludeTracks.includes("Position")) {
      event.target.complete();
    }
    else if (this.excludeTracks.includes("Ending")) {
      event.target.complete();
    }
    else {
      setTimeout(() => {
        console.log("Done");
        this.ngOnInit()
        event.target.complete();
      }, 2000);
    }
  }

  /* Favorites
   * --------------------------------------------------------
   */
  toggleFavorite(coupon_id: number) {

    if (this.authService.getRole() == null) {
      this.router.navigateByUrl('/login');
    } else if (this.authService.getRole() == "ROLE_USER") {

      this.apiService.setFavorite(coupon_id).subscribe(res => {
        console.log(res);
      })
    }
  }

  /* Share
   * --------------------------------------------------------
   */
  shareSession() {
    this.socialSharing.share("https://www.mylola.de") // "/?angebot=" + id
  }

  /* Refresher
   * --------------------------------------------------------
   */
  refresh(event) {

    //Search is not empty
    if (this.queryText != "") {
      this.filterItems();
      setTimeout(() => {
        event.target.complete();
      }, 2000);
    }
    //Category is not empty
    else if (this.excludeTracks.includes("Gastro & Nightlife") || this.excludeTracks.includes("Shopping") || this.excludeTracks.includes("Freizeit & Erleben") || this.excludeTracks.includes("Dienstleistungen")) {
      this.updateFilter();
      setTimeout(() => {
        event.target.complete();
      }, 2000);
    }
    //Position is not empty
    else if (this.excludeTracks.includes("Position")) {
      setTimeout(() => {
        this.position();
        event.target.complete();
      }, 2000);
    }
    //Ending is not empty
    else if (this.excludeTracks.includes("Ending")) {
      setTimeout(() => {
        this.ending();
        event.target.complete();
      }, 2000);
    }
    else {
      console.log('Begin async operation');
      this.ngOnInit();
      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
      }, 2000);
    }
  }

  /* Change Button Color
   * --------------------------------------------------------
   */
  btnActivate(ionicButton, name) {

    //Design
    if (ionicButton.color === 'medium') {
      ionicButton.color = 'danger';
      this.applyFilter(name);
    }
    else {
      ionicButton.color = 'medium';
      this.dismissFilter(name);
    }
  }
}

