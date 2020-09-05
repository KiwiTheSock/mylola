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
  public website: string = null;
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

      console.log(res);

    });


    //Back BUtton
    this.defaultHref = `/app/tabs/home`;

    //Edit
    this.edit();

    //Map
    this.showMap();
  }


  /* Company Coupon Edit (ToDo)
  * --------------------------------------------------------
  */
  edit() {

    /*
    var company_id = 1;
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

    var customer_id = 1;
    var coupon_id = 1;

    this.apiService.addFavorite(customer_id, coupon_id);

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

    //this.apiService.addAbo();

    this.presentToast()
  }

  async presentToast() {
    const toast = await this.toastController.create({
      //message: session.name + ' abonniert.',
      duration: 2000
    });
    toast.present();
  }

  /* Modal Coupon
  * --------------------------------------------------------
  */
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalCouponPage,
      cssClass: 'modal-css',
      swipeToClose: true, //iOS
      //componentProps: { session: session }
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
      //this.presentModal(session)
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
          text: `Webseite (${this.website})`,
          icon: !mode ? 'website' : null,
          handler: () => {
            //window.open(session.website); //Browser
            this.launchBrowser(this.website);
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
    this.router.navigateByUrl("/detail-edit");
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




