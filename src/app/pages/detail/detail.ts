import { Component, ElementRef, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { ActivatedRoute } from '@angular/router';
import { UserData } from '../../providers/user-data';
import { Platform, ActionSheetController, AlertController } from '@ionic/angular';
import { DOCUMENT} from '@angular/common';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { darkStyle } from './dark-style';

@Component({
  selector: 'page-detail',
  styleUrls: ['./detail.scss'],
  templateUrl: 'detail.html'
})
export class DetailPage implements AfterViewInit{

  //Map
  @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;

  //Favorites
  session: any;
  isFavorite = false;
  defaultHref = '';

  //Speaker?
  speaker: any;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private dataProvider: ConferenceData, 
    private userProvider: UserData,
    private route: ActivatedRoute,
    public platform: Platform,
    public actionSheetCtrl: ActionSheetController,
    public inAppBrowser: InAppBrowser,
    public alertController: AlertController,
  ) { }

  ionViewWillEnter() {
    //Favorites
    this.dataProvider.load().subscribe((data: any) => {
      if (data && data.schedule && data.schedule[0] && data.schedule[0].groups) {
        const sessionId = this.route.snapshot.paramMap.get('sessionId');
        for (const group of data.schedule[0].groups) {
          if (group && group.sessions) {
            for (const session of group.sessions) {
              if (session && session.id === sessionId) {
                this.session = session;
                this.isFavorite = this.userProvider.hasFavorite(
                  this.session.name
                );
                break;
              }
            }
          }
        }
      }
    });
  }

  ionViewDidEnter() {
    this.defaultHref = `/app/tabs/home`;
  }

  /*
  sessionClick(item: string) {
    console.log('Clicked', item);
  }
  */

  //Favorites
  toggleFavorite() {
    if (this.userProvider.hasFavorite(this.session.name)) {
      this.userProvider.removeFavorite(this.session.name);
      this.isFavorite = false;
    } else {
      this.userProvider.addFavorite(this.session.name);
      this.isFavorite = true;
    }
  }

  //Share
  shareSession() {
    console.log('Clicked share session');
  }

  //Alert
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.session.addtext,
      subHeader: this.session.title,
      buttons: ['Einlösen']
    });

    await alert.present();
  }

  /* Map
  * --------------------------------------------------------
  */

  async ngAfterViewInit() {
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
        center: mapData.find((d: any) => d.center),
        zoom: 16,
        styles: style
      });

      mapData.forEach((markerData: any) => {
        const infoWindow = new googleMaps.InfoWindow({
          content: `<h5>${markerData.name}</h5>`
        });

        const marker = new googleMaps.Marker({
          position: markerData,
          map,
          title: markerData.name
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
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


