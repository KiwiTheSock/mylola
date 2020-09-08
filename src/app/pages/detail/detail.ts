//Angular
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

//Ionic
import { Platform, ActionSheetController, ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

//Ionic-Native
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

//Capacitor
import { Plugins } from '@capacitor/core';
const { App } = Plugins;

//Others
import { ConferenceData } from '../../services/conference-data';
import { UserData } from '../../services/user-data';
import { ModalCouponPage } from '../modal-coupon/modal-coupon.page';
import { AuthService } from '../../services/auth.service';
import { mapStyle } from './mapStyle';
import { Darkmode } from '../../services/darkmode';
import { ApiService } from '../../services/api.service';

//Map
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
  public lat: string = null;
  public lng: string = null;
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
  public mo_start: string = null;
  public mo_end: string = null;
  public tu_start: string = null;
  public tu_end: string = null;
  public we_start: string = null;
  public we_end: string = null;
  public th_start: string = null;
  public th_end: string = null;
  public fr_start: string = null;
  public fr_end: string = null;
  public sa_start: string = null;
  public sa_end: string = null;
  public su_start: string = null;
  public su_end: string = null;

  //Coupon
  public bannerFilename_Coupon: string = null;
  public catcher: string = null;
  public code: string = null;
  public createdAt: string = null;
  public description: string = null;
  public coupon_id: string = null;
  public titel: string = null;

  //ToDo
  public fav: boolean = null;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private apiService: ApiService,
    private dataProvider: ConferenceData,
    private userProvider: UserData,
    private route: ActivatedRoute,
    private platform: Platform,
    private actionSheetCtrl: ActionSheetController,
    private modalController: ModalController,
    private socialSharing: SocialSharing,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private darkmode: Darkmode
  ) { }

  //Back Button
  ngOnInit() {
    if (this.platform.platforms().includes("ios")) {
      this.ios = true;
    }
    else {
      this.ios = false;
    }
  }

  //ToDo
  ionViewWillEnter() {

    //Data
    const sessionId: number = +this.route.snapshot.paramMap.get('sessionId');
    this.apiService.getCouponById(sessionId).subscribe(res => {

      let jsonResult = JSON.parse(JSON.stringify(res));
      this.data = jsonResult;

      //Company
      this.bannerFilename_Company = jsonResult.body.company[0].bannerFilename;
      this.email = jsonResult.body.company[0].email;
      this.housenumber = jsonResult.body.company[0].housenumber;
      this.company_id = jsonResult.body.company[0].company_id;
      this.lat = jsonResult.body.company[0].lat;
      this.lng = jsonResult.body.company[0].lng;
      this.logofilename = jsonResult.body.company[0].logofilename;
      this.name = jsonResult.body.company[0].name;
      this.place = jsonResult.body.company[0].place;
      this.postcode = jsonResult.body.company[0].postcode;
      this.street = jsonResult.body.company[0].street;
      this.telephone = jsonResult.body.company[0].telephone;

      //URL
      this.homepage = jsonResult.body.company[1].url.homepage;
      this.facebook = jsonResult.body.company[1].url.facebook;
      this.instagram = jsonResult.body.company[1].url.instagram;
      this.twitter = jsonResult.body.company[1].url.twitter;

      //Hours
      this.mo_start = this.time(jsonResult.body.company[1].hours.monday.split(" - ")[0]);
      this.mo_end = this.time(jsonResult.body.company[1].hours.monday.split(" - ")[1]);
      this.tu_start = this.time(jsonResult.body.company[1].hours.tuesday.split(" - ")[0]);
      this.tu_end = this.time(jsonResult.body.company[1].hours.tuesday.split(" - ")[1]);
      this.we_start = this.time(jsonResult.body.company[1].hours.wednesday.split(" - ")[0]);
      this.we_end = this.time(jsonResult.body.company[1].hours.wednesday.split(" - ")[1]);
      this.th_start = this.time(jsonResult.body.company[1].hours.thursday.split(" - ")[0]);
      this.th_end = this.time(jsonResult.body.company[1].hours.thursday.split(" - ")[1]);
      this.fr_start = this.time(jsonResult.body.company[1].hours.friday.split(" - ")[0]);
      this.fr_end = this.time(jsonResult.body.company[1].hours.friday.split(" - ")[1]);
      this.sa_start = this.time(jsonResult.body.company[1].hours.saturday.split(" - ")[0]);
      this.sa_end = this.time(jsonResult.body.company[1].hours.saturday.split(" - ")[1]);
      this.su_start = this.time(jsonResult.body.company[1].hours.sunday.split(" - ")[0]);
      this.su_end = this.time(jsonResult.body.company[1].hours.sunday.split(" - ")[1]);

      //Coupon
      this.bannerFilename_Coupon = jsonResult.body.bannerFilename_Coupon;
      this.catcher = jsonResult.body.catcher;
      this.code = jsonResult.body.code;
      this.createdAt = jsonResult.body.createdAt.date;
      this.description = jsonResult.body.description;
      this.coupon_id = jsonResult.body.coupon_id;
      this.titel = jsonResult.body.titel;
    });


    //Back BUtton
    this.defaultHref = `/app/tabs/home`;

    //Edit
    this.edit();

    //Map
    this.showMap();
  }

  /* Get Hours and Minutes
   * --------------------------------------------------------
   */
  time(date: any) {
    return new Date(date).toLocaleTimeString().slice(0, -3);
  }

  /* Company Coupon Edit (ToDo)
  * --------------------------------------------------------
  */
  edit() {

    /*
    var company_id = 1;
      const sessionId: number = +this.route.snapshot.paramMap.get('sessionId'); == CouponsByCompanyId
    this.apiService.getCouponsByCompany(company_id).subscribe(res => {
    })
    */

    if (this.authService.getRole() == "ROLE_COMPANY" && this.router.url === "/app/tabs/home/detail/1") {
      this.show = true;
    }
  }

  /* Favorites (ToDo)
  * --------------------------------------------------------
  */
  toggleFavorite() {
    const sessionId: number = +this.route.snapshot.paramMap.get('sessionId');
    var customer_id = 1;
    var coupon_id = 1;

    this.apiService.setFavorite(customer_id, coupon_id);

    /*
    if (this.userProvider.hasFavorite(session.name)) {
      this.userProvider.removeFavorite(session.name);
      session.fav = true;
    } else {
      this.userProvider.addFavorite(session.name);
      session.fav = false;
    }
    */
  }

  /* Share
  * --------------------------------------------------------
  */
  shareSession() {
    this.socialSharing.share("https://www.mylola.de") // "/?angebot=" + id
  }

  /* Notification (ToDo)
  * --------------------------------------------------------
  */
  notification() {

    let company_id = this.data.body.company[0].id

    this.apiService.addSubscriber(company_id);

    this.presentToast()
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.name + ' abonniert.',
      duration: 2000
    });
    toast.present();
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
      componentProps: {coupon_id: coupon_id}
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
      this.presentModal()
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
          icon: !mode ? 'website' : null,
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

    //Marker
    var marker: any = {
      name: this.name,
      lat: this.lat,
      lng: this.lng
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
  }
}




