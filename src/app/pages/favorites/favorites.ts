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
import { AuthService } from '../../services/auth.service';

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
  queryText = '';

  //Data
  data: any;
  devaluations: any;
  public counter: number = 0;
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
    private changeRef: ChangeDetectorRef,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    console.log("ngOnInit")
    this.getData();
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter")
    this.getData();
  }

  getData() {

    //Data

    if (this.authService.getRole() == "ROLE_COMPANY") {
      this.apiService.getCompanyCoupons().subscribe((res: any) => {
        let jsonResult = JSON.parse(JSON.stringify(res));

        console.log(jsonResult);

        //200 is an empty body
        if (jsonResult.body.status == 200) {
          this.data = "";
        }
        else {

          this.data = jsonResult.body;
          /*
          var tmp = this.counter + 50;

          for (this.counter; this.counter < tmp; this.counter++) {

            //console.log(jsonResult.body[this.counter]);

            if (jsonResult.body[this.counter]) {
              this.data.push(jsonResult.body[this.counter]);
            }
          }
          */
        }
      })
    }

    if (this.authService.getRole() == "ROLE_USER") {
      this.apiService.getFavorite().subscribe((res: any) => {
        let jsonResult = JSON.parse(JSON.stringify(res));
        console.log(jsonResult);

        //200 is an empty body
        if (jsonResult.body.status == 200) {
          this.data = "";
        }
        else {

          this.data = jsonResult.body;
          /*
          var tmp = this.counter + 50;

          for (this.counter; this.counter < tmp; this.counter++) {

            console.log(this.counter);
            console.log(jsonResult.body[this.counter]);

            if (jsonResult.body[this.counter]) {
              this.data.push(jsonResult.body[this.counter]);
            }
          }
          */
        }
      })
    }

    /*
    this.apiService.getDevaluationByIdentifier().subscribe((res: any) => {
      let jsonResult = JSON.parse(JSON.stringify(res));
      //console.log(jsonResult.body);
      this.devaluations = jsonResult.body;
    })
    */
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
      this.position();
    }

    if (name == 6) {
      this.ending();
    }

    this.updateFilter();
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
      this.ngOnInit();
    }

    if (name == 6) {
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

  loadData(event) {

    setTimeout(() => {
      console.log("Done");
      //this.ngOnInit()
      event.target.complete();
    }, 2000);

  }

  /* Favorites
   * --------------------------------------------------------
   */
  toggleFavorite(coupon_id: number) {
    if (this.authService.getRole() == "ROLE_USER") {
      this.apiService.deFavorite(coupon_id).subscribe(res => {
        console.log(res);
        this.ngOnInit();
      })
    }
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

  ending() {
    this.apiService.filterByEnding().subscribe(res => {
      
      this.data = null;
      
      var jsonResult = JSON.parse(JSON.stringify(res));
      console.log(jsonResult.body);
      this.data = jsonResult.body;
    
    })
  }
}