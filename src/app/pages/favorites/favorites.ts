//Angular
import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Ionic
import { AlertController, IonRouterOutlet, LoadingController, ModalController, ToastController, Config, IonInfiniteScroll } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';

//Ionic-Native
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

//Others
import { UserData } from '../../services/user-data';
import { Darkmode } from '../../services/darkmode';
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

  //Search
  showSearchbar: boolean;
  queryText = '';

  //Data
  public data;
  devaluations: any;
  public counter: number = 0;
  isUsed: boolean = false;

  //Position
  lat = null;
  lng = null;

  constructor(
    public alertCtrl: AlertController,
    public apiService: ApiService,
    private authService: AuthService,
    public config: Config,
    public darkmode: Darkmode,
    private geo: Geolocation,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    private socialSharing: SocialSharing,
    public toastCtrl: ToastController,
    public user: UserData,
  ) { }

  ngOnInit() {
    this.getData();
  }

  ionViewWillEnter() {
    this.getData();
  }

  /* Get Data
   * --------------------------------------------------------
   */
  getData() {

    //Company Coupons
    if (this.authService.getRole() == "ROLE_COMPANY") {
      this.apiService.getCompanyCoupons().subscribe((res: any) => {
        let jsonResult = JSON.parse(JSON.stringify(res));

        //200 is an empty body
        if (jsonResult.body.status == 200) {
          this.data = "";
        }
        else {
          this.data = jsonResult.body;
        }
      })
    }

    //Favorite Coupons
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
        }
      })
    }
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

  /* Refresher
   * --------------------------------------------------------
   */
  refresh(event) {
    console.log('Begin async operation');

    this.ngOnInit();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  /* Infinite Scrolling
   * --------------------------------------------------------
   */
  loadData(event) {
    setTimeout(() => {
      console.log("Done");
      //this.ngOnInit()
      event.target.complete();
    }, 2000);
  }

}