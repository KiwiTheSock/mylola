//Angular
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location, PlatformLocation } from '@angular/common';
import { Router } from '@angular/router';

//Ionic
import { MenuController, Platform, ToastController, PopoverController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

//Ionic-Native
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

//Others
import { AuthService } from './services/auth.service';
import { Darkmode } from './services/darkmode';
import { ModalLogoutPage } from './pages/modal-logout/modal-logout.page';
import { UserData } from './services/user-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  appPages = [
    {
      title: 'Home',
      url: '/app/tabs/home',
      icon: 'home'
    },
    {
      title: 'Favoriten',
      url: '/app/tabs/favorites',
      icon: 'bookmark'
    },
    {
      title: 'Veranstaltungen',
      url: '/app/tabs/events',
      icon: 'calendar'
    }
  ];

  loggedIn = false;

  session: any;

  //Hardware Back Button
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  //Only For Browser
  croppedImage = "../../assets/img/add/kein-bild-vorhanden-16-9.png";

  constructor(
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private userData: UserData,
    private toastCtrl: ToastController,
    public darkmode: Darkmode,
    private authService: AuthService,
    public popoverCtrl: PopoverController,
    public modalController: ModalController,
    private location: Location,
    private platformLocation: PlatformLocation,
  ) {
    //Initialize App
    this.initializeApp();

    //Only For Browser
    this.platformLocation.onPopState(async () => {
      const modal = await this.modalController.getTop();
      if (modal) {
        modal.dismiss(this.croppedImage);
      }
    });

    //Hardware Back Button
    this.backButtonEvent();
  }

  /* Initialize App
  * --------------------------------------------------------
  */
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async ngOnInit() {
    this.checkLoginStatus();
    this.listenForLoginEvents();
  }

  checkLoginStatus() {
    return this.userData.isLoggedIn().then(loggedIn => {
      return this.updateLoggedInStatus(loggedIn);
    });
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }

  listenForLoginEvents() {
    window.addEventListener('user:login', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:signup', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:logout', () => {
      this.updateLoggedInStatus(false);
    });
  }

  /* Hardware Back Button
  * --------------------------------------------------------
  */
  backButtonEvent() {
    this.platform.backButton.subscribe(() => {

      var arr = [];
      arr = this.router.url.split('/');
      if (this.router.url != '/app/tabs/home' && this.router.url != '/app/tabs/favorites' && this.router.url != '/app/tabs/events' && arr[4] != "detail") {
        this.location.back();
      } else if (this.router.url === '/app/tabs/home') {
        if (new Date().getTime() - this.lastTimeBackPress >= this.timePeriodToExit) {
          this.lastTimeBackPress = new Date().getTime();
          this.presentToast();
        } else {
          navigator['app'].exitApp();
        }
      }
      else if (this.router.url === '/app/tabs/favorites') {
        this.router.navigate(['/app/tabs/home']);
      } else if (this.router.url === '/app/tabs/events') {
        this.router.navigate(['/app/tabs/home']);
      } else if (arr.includes("detail")){
        this.router.navigate(['/app/tabs/home']);
      }
    });
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Wenn Sie die App verlassen möchten, drücken Sie noch einaml auf die Zurück-Taste',
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }

  /* Logout Modal
  * --------------------------------------------------------
  */
  async presentModal(session: any) {
    const modal = await this.modalController.create({
      component: ModalLogoutPage,
      cssClass: 'modal-logout-css',
      swipeToClose: true, //iOS
      componentProps: { session: session }
    });

    await modal.present();

    if (!window.history.state.modal) {
      const modalState = { modal: true };
      history.pushState(modalState, null);
    }
  }

  logout() {
    this.authService.logout();
    this.userData.logout().then(() => {
      return this.router.navigateByUrl('/app/tabs/home');
    });
  }

  /* Tutorial
  * --------------------------------------------------------
  */
  openTutorial() {
    this.menu.enable(false);
    this.storage.set('ion_did_tutorial', false);
    this.router.navigateByUrl('/tutorial');
  }

  /* Darkmode
  * --------------------------------------------------------
  */
  changeDarkmode() {
    this.darkmode.darkmode();
  }

}