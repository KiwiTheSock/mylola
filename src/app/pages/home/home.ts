//Angular
import { Component, ViewChild, OnInit, Renderer2, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//Ionic
import { AlertController, IonList, IonRouterOutlet, LoadingController, ModalController, ToastController, Config, NavParams, IonInfiniteScroll, Platform } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';

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
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll; //Notwendig?

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
  public data: any = [];
  public counter: number = 0;
  public fav: boolean = false;

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
    private geo: Geolocation
  ) { }

  ngOnInit() {
    this.getData();
  }

  ionViewWillEnter() {
    //Home Tab
    this.tabs.home();
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
    this.apiService.getCoupons().subscribe((res: any) => {
      var jsonResult = JSON.parse(JSON.stringify(res));

      //200 is an empty body
      if (jsonResult.body.status == 200) {
        this.data = "";
      }
      else {
        var tmp = this.counter + 5;

        for (this.counter; this.counter < tmp; this.counter++) {

          //console.log(jsonResult.body[this.counter]);

          if (jsonResult.body[this.counter]) {
            this.data.push(jsonResult.body[this.counter]);
          }
        }
      }
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
      this.position();
    }

    if (name == 6) {
      this.ending();
    }
    //this.updateSchedule();
    this.updateFilter();
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

    //this.updateSchedule();
    this.updateFilter();
  }

  updateFilter() {
    console.log(this.excludeTracks);
  }

  filterItems() {
    //console.log(this.queryText);

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

  //Update timeline
  updateSchedule() {
    /*
    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.groups = data.groups;
    });
    */
  }

  loadData(event) {

    setTimeout(() => {
      console.log("Done");
      this.getData(); //oder ngOnInit()
      event.target.complete();
    }, 2000);

  }

  //Favorites
  toggleFavorite(coupon_id: number) {

    this.apiService.setFavorite(coupon_id).subscribe(res => {
      console.log(res);
    })

    /*
    if (this.fav == true) {
      this.apiService.deFavorite(coupon_id).subscribe(res => {
        console.log(res);
        this.fav = false;
      })
    } else {
      this.apiService.setFavorite(coupon_id).subscribe(res => {
        console.log(res);
        this.fav = true;
      })
    }
    */
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

    //API CALL

  }

  ending() {
    //API CALL
  }

}

