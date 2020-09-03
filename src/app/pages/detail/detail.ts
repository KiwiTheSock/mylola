//Angular
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

//Ionic
import { Platform, ActionSheetController, AlertController, ToastController } from '@ionic/angular';
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

declare var google: any;

@Component({
  selector: 'page-detail',
  styleUrls: ['./detail.scss'],
  templateUrl: 'detail.html'
})
export class DetailPage {

  ios: boolean;

  //Map
  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;
  map: any;
  infoWindows: any = [];

  session: any;

  defaultHref = '';

  //Company Coupon Edit
  show = false;

  //Share Data
  text: string = 'Mylola';
  link: string = 'https://www.mylola.de/';

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private dataProvider: ConferenceData,
    private userProvider: UserData,
    private route: ActivatedRoute,
    public platform: Platform,
    public actionSheetCtrl: ActionSheetController,
    public alertController: AlertController,
    public modalController: ModalController,
    private socialSharing: SocialSharing,
    private authService: AuthService,
    private router: Router,
    public toastController: ToastController,
    private darkmode: Darkmode
  ) { }

  ngOnInit() {
    if (this.platform.platforms().includes("ios")) {
      this.ios = true;
    }
    else {
      this.ios = false;
    }
  }

  ionViewWillEnter() {
    this.dataProvider.load().subscribe((data: any) => {
      if (data && data.schedule && data.schedule[0] && data.schedule[0].groups) {
        const sessionId = this.route.snapshot.paramMap.get('sessionId');
        for (const group of data.schedule[0].groups) {
          if (group && group.sessions) {
            for (const session of group.sessions) {
              if (session && session.id === sessionId) {
                this.session = session;
                break;
              }
            }
          }
        }
      }
    });

    this.edit();
  }

  ionViewDidEnter() {
    this.defaultHref = `/app/tabs/home`;

    this.showMap();
  }

  /* Company Coupon Edit
  * --------------------------------------------------------
  */
  edit() {
    if (this.authService.getRole() == "ROLE_COMPANY" && this.router.url === "/app/tabs/home/detail/1") {
      this.show = true;
    }
  }

  /* Favorites (API CALL)
  * --------------------------------------------------------
  */
  toggleFavorite(session: any) {
    if (this.userProvider.hasFavorite(session.name)) {
      this.userProvider.removeFavorite(session.name);
      session.fav = true;
    } else {
      this.userProvider.addFavorite(session.name);
      session.fav = false;
    }
  }

  /* Share
  * --------------------------------------------------------
  */
  shareSession(session: any) {
    const url = this.link;
    const text = 'Test' + '\n';
    this.socialSharing.share(text, 'MEDIUM', null, session.facebook);
  }

  /* Notification (API CALL)
  * --------------------------------------------------------
  */
  notification(session: any) {
    console.log("Abonniert");
    this.presentToast(session)
  }

  async presentToast(session: any) {
    const toast = await this.toastController.create({
      message: session.name + ' abonniert.',
      duration: 2000
    });
    toast.present();
  }

  /* Modal Coupon
  * --------------------------------------------------------
  */
  async presentModal(session: any) {
    const modal = await this.modalController.create({
      component: ModalCouponPage,
      cssClass: 'modal-css',
      swipeToClose: true, //iOS
      componentProps: { session: session }
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
  isLoggedIn(session: any) {
    if (this.authService.getRole() == null) {
      this.router.navigateByUrl('/login');
    } else {
      this.presentModal(session)
    }
  }

  /* Facebook
  * --------------------------------------------------------
  */
  facebook(session: any) {
    window.open(session.facebook, '_system', 'location=yes');
  }

  /* Instagram
   * --------------------------------------------------------
   */
  instagram(session: any) {
    window.open(session.instagram, '_system', 'location=yes');
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
  async openContact(session: any) {
    const mode = this.ios; 

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Kontaktiere ' + session.name,
      buttons: [
        {
          text: `Webseite (${session.website})`,
          icon: !mode ? 'website' : null,
          handler: () => {
            //window.open(session.website);
            this.launchBrowser(session.website);
          }
        },
        {
          text: `Mail (${session.mail})`,
          icon: !mode ? 'mail' : null,
          handler: () => {
            //window.open('mailto:' + session.mail);
            this.sendEmail(session.mail);
          }
        },
        {
          text: `Anrufen (${session.phone})`,
          icon: !mode ? 'call' : null,
          handler: () => {
            window.open('tel:' + session.phone);
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
      '<ion-button id="navigate">Navigieren</ion-button>' +
      '</div>';
    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
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

    this.dataProvider.getMap().subscribe((markers: any) => {

      //Get Data
      const sessionId = this.route.snapshot.paramMap.get('sessionId');
      var id: number = +sessionId;
      var marker: any = {
        name: markers[id - 1].name,
        lat: markers[id - 1].lat,
        lng: markers[id - 1].lng
      }

      const location = new google.maps.LatLng(marker.lat, marker.lng);
      let style = [];
      const options = {
        center: location,
        zoom: 15,
        disableDefaultUI: true,
      }

      if (this.darkmode.dark) {
        style = mapStyle;
      }

      this.map = new google.maps.Map(this.mapRef.nativeElement, { options, styles: style });
      this.addMarkersToMap(marker);
    });
  }
}




