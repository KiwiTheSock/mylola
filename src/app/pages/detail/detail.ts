import { Component, ElementRef, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { ConferenceData } from '../../services/conference-data';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData } from '../../services/user-data';
import { Platform, ActionSheetController, AlertController, NavController } from '@ionic/angular';
import { DOCUMENT} from '@angular/common';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { darkStyle } from './dark-style';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page'; 
import { Plugins, AppState } from '@capacitor/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AuthService } from '../../services/auth.service';

const { App } = Plugins;

@Component({
  selector: 'page-detail',
  styleUrls: ['./detail.scss'],
  templateUrl: 'detail.html'
})
export class DetailPage implements AfterViewInit{

  //Map
  @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;

  session: any;
  defaultHref = '';

  text: string='Mylola ... teilen ... bla bla';
  link: string='https://www.mylola.de/';
  
  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private dataProvider: ConferenceData, 
    private userProvider: UserData,
    private route: ActivatedRoute,
    public platform: Platform,
    public actionSheetCtrl: ActionSheetController,
    public inAppBrowser: InAppBrowser,
    public alertController: AlertController,
    public modalController : ModalController,
    private socialSharing: SocialSharing,
    private authService: AuthService,
    private router: Router,
  ) { }

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
  }

  ionViewDidEnter() {
    this.defaultHref = `/app/tabs/schedule`;
  }

  //Favorites
  toggleFavorite(session: any) {
    if (this.userProvider.hasFavorite(session.name)) {
      this.userProvider.removeFavorite(session.name);
      session.fav = true;
    } else {
      this.userProvider.addFavorite(session.name);
      session.fav = false;
    }
  }

  //Share
  shareSession(session: any) {
    const url = this.link;
    const text = 'Test'+'\n';
    this.socialSharing.share(text, 'MEDIUM', null, session.facebook);
  }

  //Notification
  notification() {
    console.log("Abonniert");
  }

  //Modal
  async presentModal(session: any) {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'modal-css',
      swipeToClose: true, //iOS
      componentProps: { session: session }
    });
   
    //Passed back data
    /*
    modal.onDidDismiss()
      .then((data) => {
        const users = data['data']; 
      console.log(data);
    });
    */
   
    await modal.present();

    if(!window.history.state.modal) {
      const modalState = { modal: true };
      history.pushState(modalState, null);
    }
  }

  isLoggedIn(session: any){
    console.log(this.authService.getRole());
    if(this.authService.getRole() == null || this.authService.getRole().email == null){
      this.router.navigateByUrl('/login');
    } else{
      this.presentModal(session)
    }
  }

  //Facebook
  facebook(session: any){
    window.open(session.facebook, '_system','location=yes');
  }

  //Browser
  async launchBrowser(url){
    var ret = await App.canOpenUrl({ url: url });

    var retx = await App.openUrl({ url: url });
    console.log("Open url response: ", ret);
  }
  
  //Mail
  sendEmail(mail){
    this.socialSharing.shareViaEmail('', '', [mail]);
  }

  //Contact
  async openContact(session: any) {
    const mode = 'ios'; // this.config.get('mode');

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Kontaktiere ' + session.name,
      buttons: [
        {
          text: `Webseite ( ${session.website} )`,
          icon: mode !== 'ios' ? 'website' : null,
          handler: () => {
            //window.open(session.website);
            this.launchBrowser(session.website);
          }
        },
        {
          text: `Mail ( ${session.mail} )`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            //window.open('mailto:' + session.mail);
            this.sendEmail(session.mail);
          }
        },
        {
          text: `Anrufen ( ${session.phone} )`,
          icon: mode !== 'ios' ? 'call' : null,
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

  openSettings() {
    console.log("Bearbeiten");
  }

  /* Map
  * --------------------------------------------------------
  */

  async ngAfterViewInit() {

    var sessionID = parseInt(document.URL.split("/")[7]) -1;

    const appEl = this.doc.querySelector('ion-app');
    let isDark = false;
    let style = [];
    if (appEl.classList.contains('dark-theme')) {
      style = darkStyle;
    }

    const googleMaps = await getGoogleMaps(
      'AIzaSyB8pf6ZdFQj5qw7rc_HSGrhUwQKfIe9ICw'
    );

    let map;
    
    this.dataProvider.getMap().subscribe((mapData: any) => {
      const mapEle = this.mapElement.nativeElement;

      map = new googleMaps.Map(mapEle, {
        center: {
          lat: mapData[sessionID].lat,
          lng: mapData[sessionID].lng,
        },
        zoom: 16,
        styles: style
      });

      mapData.forEach((markerData: any) => {
        const marker = new googleMaps.Marker({
          position:{
            lat: mapData[sessionID].lat,
            lng: mapData[sessionID].lng,
          },
          map
        });
      });

      googleMaps.event.addListenerOnce(map, 'idle', () => {
        mapEle.classList.add('show-map');
      });
    });

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const el = mutation.target as HTMLElement;
          isDark = el.classList.contains('dark-theme');
          if (map && isDark) {
            map.setOptions({styles: darkStyle});
          } else if (map) {
            map.setOptions({styles: []});
          }
        }
      });
    });
    observer.observe(appEl, {
      attributes: true
    });
  }
}

//Map
function getGoogleMaps(apiKey: string): Promise<any> {
  const win = window as any;
  const googleModule = win.google;
  if (googleModule && googleModule.maps) {
    return Promise.resolve(googleModule.maps);
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.31`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    script.onload = () => {
      const googleModule2 = win.google;
      if (googleModule2 && googleModule2.maps) {
        resolve(googleModule2.maps);
      } else {
        reject('google maps not available');
      }
    };
  });
}


