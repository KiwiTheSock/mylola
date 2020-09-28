//Angular
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//Ionic
import { Platform, ActionSheetController, ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

//Ionic-Native
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

//Capacitor
import { Plugins } from '@capacitor/core';
const { App } = Plugins;

//Others
import { ModalCouponPage } from '../modal-coupon/modal-coupon.page';
import { AuthService } from '../../services/auth.service';
import { Darkmode } from '../../services/darkmode';
import { ApiService } from '../../services/api.service';

//Map
import { mapStyle } from './mapStyle';
declare var google: any;

@Component({
  selector: 'page-detail',
  styleUrls: ['./detail.scss'],
  templateUrl: 'detail.html'
})

export class DetailPage {

  //Map
  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;
  map: any;
  infoWindows: any = [];

  //Company Coupon Edit
  show = false;

  //Company
  comp = false;

  //Back Button
  defaultHref = '';
  ios: boolean;

  //Data
  public data: any;

  //Company
  public bannerFilename_Company: string = null;
  public email: string = null;
  public housenumber: string = null;
  public company_id: string = null;
  public logofilename: string = null;
  public name: string = null;
  public place: string = null;
  public postcode: string = null;
  public street: string = null;
  public telephone: string = null;

  //URL
  public homepage: string = null;
  public facebook: string = null;
  public instagram: string = null;
  public twitter: string = null;

  //Hours
  public monday: string = null;
  public tuesday: string = null;
  public wednesday: string = null;
  public thursday: string = null;
  public friday: string = null;
  public saturday: string = null;
  public sunday: string = null;

  //Coupon
  public bannerFilename_Coupon: string = null;
  public catcher: string = null;
  public code: string = null;
  public createdAt: string = null;
  public description: string = null;
  public coupon_id: string = null;
  public titel: string = null;
  public id: number = null;

  public fav: boolean = false;
  public used: boolean = false;
  public abos: boolean = false;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private platform: Platform,
    private actionSheetCtrl: ActionSheetController,
    private modalController: ModalController,
    private socialSharing: SocialSharing,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private darkmode: Darkmode
  ) {
    //Back Button
    if (this.platform.platforms().includes("ios")) {
      this.ios = true;
    }
    else {
      this.ios = false;
    }
  }

  //Data
  ngOnInit() {
    this.getData();
  }

  ionViewWillEnter() {

    //Data
    this.getData();

    //Back BUtton
    this.defaultHref = `/app/tabs/home`;

    //Edit
    this.edit();

    //Compnay
    this.company();

    //Map
    this.showMap();
  }

  /* Get Data
   * --------------------------------------------------------
   */
  getData() {

    const sessionId: number = +this.route.snapshot.paramMap.get('sessionId');

    this.apiService.getCouponById(sessionId).subscribe(res => {

      let jsonResult = JSON.parse(JSON.stringify(res));
      this.data = jsonResult;

      console.log(jsonResult);

      //Company
      this.bannerFilename_Company = jsonResult.body.company.bannerFilename;
      this.email = jsonResult.body.company.email;
      this.housenumber = jsonResult.body.company.housenumber;
      this.logofilename = jsonResult.body.company.logoFilename;
      this.name = jsonResult.body.company.name;
      this.place = jsonResult.body.company.place;
      this.postcode = jsonResult.body.company.postcode;
      this.street = jsonResult.body.company.street;
      this.telephone = jsonResult.body.company.telephone;
      this.company_id = jsonResult.body.company.id;

      //Coupon
      this.bannerFilename_Coupon = jsonResult.body.bannerFilename;
      this.catcher = jsonResult.body.catcher;
      this.code = jsonResult.body.code;
      this.createdAt = jsonResult.body.createdAt;
      this.description = jsonResult.body.description;
      this.coupon_id = jsonResult.body.coupon_id;
      this.titel = jsonResult.body.title;

      //URL
      this.homepage = jsonResult.body.company.urls.homepage;
      this.facebook = jsonResult.body.company.urls.facebook;
      this.instagram = jsonResult.body.company.urls.instagram;
      this.twitter = jsonResult.body.company.urls.twitter;

      //Hours
      this.monday = jsonResult.body.company.hours.monday;
      this.tuesday = jsonResult.body.company.hours.tuesday;
      this.wednesday = jsonResult.body.company.hours.wednesday;
      this.thursday = jsonResult.body.company.hours.thursday;
      this.friday = jsonResult.body.company.hours.friday;
      this.saturday = jsonResult.body.company.hours.saturday;
      this.sunday = jsonResult.body.company.hours.sunday;
    });

    //Check Favorites
    this.apiService.getFavorite().subscribe(res => {

      let jsonResult = JSON.parse(JSON.stringify(res));

      for (let i = 0; i < jsonResult.body.length; i++) {
        if (jsonResult.body[i].id == sessionId) {
          this.fav = true;
        }
      }
    });

    //Check Devaluations
    if (this.authService.getRole() == "ROLE_USER") {
      this.apiService.getDevaluationByIdentifier().subscribe(res => {
        let jsonResult = JSON.parse(JSON.stringify(res));

        for (let i = 0; i < jsonResult.body.length; i++) {
          if (jsonResult.body[i].isUsed) {
            if (jsonResult.body[i].coupon.id == sessionId) {
              this.used = true;
            }
          }
        }
      })
    }

    //Check Subscriptions
    if (this.authService.getRole() == "ROLE_USER") {
      this.apiService.getMySubscribtions().subscribe(res => {
        let jsonResult = JSON.parse(JSON.stringify(res));

        for (let i = 0; i < jsonResult.body.length; i++) {
          if (jsonResult.body[i].id == this.company_id) {
            this.abos = true;
          }
        }
      })
    }

  }

  /* Get Hours and Minutes
   * --------------------------------------------------------
   */
  time(date: any) {
    return new Date(date).toLocaleTimeString().slice(0, -3);
  }

  /* Company Coupon Edit 
  * --------------------------------------------------------
  */
  edit() {
    const sessionId: number = +this.route.snapshot.paramMap.get('sessionId');

    if (this.authService.getRole() == "ROLE_COMPANY") {
      this.apiService.getCompanyCoupons().subscribe(res => {
        let jsonResult = JSON.parse(JSON.stringify(res));
        for (let i = 0; i < jsonResult.body.length; i++) {
          if (jsonResult.body[i].id == sessionId) {
            this.show = true;
          }
        }
      });
    }
  }

  company() {
    if (this.authService.getRole() == "ROLE_COMPANY") {
      this.comp = true;
    }
  }

  /* Favorites
  * --------------------------------------------------------
  */
  toggleFavorite(coupon_id: number) {

    if (this.authService.getRole() == null) {
      this.router.navigateByUrl('/login');
    } else {
      const sessionId: number = +this.route.snapshot.paramMap.get('sessionId');

      if (this.fav == true) {
        this.apiService.deFavorite(sessionId).subscribe(res => {
          console.log(res);
          this.fav = false;
        })
      } else {
        this.apiService.setFavorite(sessionId).subscribe(res => {
          console.log(res);
          this.fav = true;
        })
      }

      this.ngOnInit();
    }
  }

  /* Share
  * --------------------------------------------------------
  */
  shareSession() {
    this.socialSharing.share("https://www.mylola.de") // "/?angebot=" + id
  }

  /* Notification
  * --------------------------------------------------------
  */
  notification() {
    if (this.authService.getRole() == null) {
      this.router.navigateByUrl('/login');
    } else {
      let company_id = this.data.body.company.id

      this.apiService.addSubscriber(company_id).subscribe(res => {
        console.log(res);
      })

      this.presentToast();
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.name + ' abonniert.',
      duration: 2000
    });
    toast.present();
    this.ngOnInit();
  }

  /* Modal Coupon
  * --------------------------------------------------------
  */
  async presentModal() {

    const coupon_id: number = +this.route.snapshot.paramMap.get('sessionId');

    const modal = await this.modalController.create({
      component: ModalCouponPage,
      cssClass: 'modal-css',
      swipeToClose: true, //iOS
      componentProps: { coupon_id: coupon_id }
    });

    modal.onDidDismiss().then(() => {
      this.ngOnInit();
    });

    await modal.present();

    if (!window.history.state.modal) {
      const modalState = { modal: true };
      history.pushState(modalState, null);
    }
  }

  /* Logged In
  * --------------------------------------------------------
  */
  isLoggedIn() {
    if (this.authService.getRole() == null) {
      this.router.navigateByUrl('/login');
    } else {
      this.presentModal().then(() => {
        this.ngOnInit();
      })
    }
  }

  /* Facebook
  * --------------------------------------------------------
  */
  openFacebook() {
    window.open(this.facebook, '_system', 'location=yes');
  }

  /* Instagram
   * --------------------------------------------------------
   */
  openInstagram() {
    window.open(this.instagram, '_system', 'location=yes');
  }

  /* Twitter
  * --------------------------------------------------------
  */
  openTwitter() {
    window.open(this.twitter, '_system', 'location=yes');
  }

  /* Browser
  * --------------------------------------------------------
  */
  async launchBrowser(url) {
    var ret = await App.canOpenUrl({ url: url });

    var retx = await App.openUrl({ url: url });
    console.log("Open url response: ", ret);
  }

  /* E-Mail
  * --------------------------------------------------------
  */
  sendEmail(mail) {
    this.socialSharing.shareViaEmail('', '', [mail]);
  }

  /* Contact
  * --------------------------------------------------------
  */
  async openContact() {
    const mode = this.ios;

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Kontaktiere ' + name,
      buttons: [
        {
          text: `Webseite (${this.homepage})`,
          icon: !mode ? 'globe' : null,
          handler: () => {
            //window.open(session.homepage); //Browser
            this.launchBrowser(this.homepage);
          }
        },
        {
          text: `Mail (${this.email})`,
          icon: !mode ? 'mail' : null,
          handler: () => {
            //window.open('mailto:' + session.mail); //Browser
            this.sendEmail(this.email);
          }
        },
        {
          text: `Anrufen (${this.telephone})`,
          icon: !mode ? 'call' : null,
          handler: () => {
            window.open('tel:' + this.telephone);
          }
        },
        {
          text: 'Abbrechen',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  /* Settings
  * --------------------------------------------------------
  */
  openSettings() {
    const sessionId: number = +this.route.snapshot.paramMap.get('sessionId');
    this.router.navigateByUrl("/app/tabs/home/detail/" + sessionId + "/detail-edit");
  }

  /* Map
  * --------------------------------------------------------
  */
  addMarkersToMap(marker) {
    let position = new google.maps.LatLng(marker.lat, marker.lng);
    let mapMarker = new google.maps.Marker({
      position: position,
      title: marker.name,
      latitude: marker.lat,
      longitude: marker.lng
    });

    mapMarker.setMap(this.map);
    this.addInfoWindowToMarker(mapMarker);
  }

  addInfoWindowToMarker(marker) {
    let infoWindowContent = '<div id="content">' +
      //'<h2 id="firstHeading" class="firstHEading">' + marker.title + '</h2>' +
      //'<p>Latitude: ' + marker.latitude + '</p>' +
      //'<p>Longitude: ' + marker.longitude + '</p>' +
      '<ion-button fill="clear" id="navigate">Navigieren</ion-button>' +
      '</div>';
    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent,
    });

    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);

      google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
        document.getElementById('navigate').addEventListener('click', () => {
          console.log('navigate button clicked');
          //code to navigate using google maps app
          window.open('https://www.google.com/maps/dir/?api=1&destination=' + marker.latitude + ',' + marker.longitude);
        });
      });

    });
    this.infoWindows.push(infoWindow);
  }

  closeAllInfoWindows() {
    for (let window of this.infoWindows) {
      window.close();
    }
  }

  showMap() {
    const sessionId: number = +this.route.snapshot.paramMap.get('sessionId');

    this.apiService.getCouponById(sessionId).subscribe(res => {

      let jsonResult = JSON.parse(JSON.stringify(res));

      var lat = jsonResult.body.company.latitude;
      var lng = jsonResult.body.company.longitude;

      //console.log("LAT/LNG: ", lat, lng)

      var marker: any = {
        name: this.name,
        lat: lat,
        lng: lng
      }

      //Location
      const location = new google.maps.LatLng(marker.lat, marker.lng);
      let style = [];
      const options = {
        center: location,
        zoom: 15,
        disableDefaultUI: true,
      }

      //Darkmode
      if (this.darkmode.dark) {
        style = mapStyle;
      }

      //Create Map
      this.map = new google.maps.Map(this.mapRef.nativeElement, { options, styles: style });
      this.addMarkersToMap(marker);
    })
  }
}




