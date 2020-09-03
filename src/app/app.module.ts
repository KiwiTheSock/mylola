//Angular
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import localeDe from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';
import { NgModule, LOCALE_ID } from '@angular/core';

//Ionic
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { NavParams } from '@ionic/angular';

//Ionic-Native
import { Camera } from "@ionic-native/camera/ngx";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

//Language
registerLocaleData(localeDe);

//Others
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Darkmode } from './services/darkmode';
import { ModalCouponPageModule } from './pages/modal-coupon/modal-coupon.module';
import { NgCalendarModule } from 'ionic2-calendar'; 
import { Refresher } from './services/refresher';
import { SharedModule } from './directives/shared.module';
import {HidenavModule} from '../app/hidenav/hidenav.module';//'./hidenav/hidenav.module';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule, 
    FormsModule,
    HttpClientModule,
    ModalCouponPageModule,
    NgCalendarModule,
    ReactiveFormsModule,
    SharedModule,
    HidenavModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
  ],
  declarations: [AppComponent],
  providers: [
    Camera, 
    Darkmode,
    Geolocation,
    NavParams, 
    Refresher, 
    SocialSharing, 
    SplashScreen, 
    StatusBar, 
    { provide: LOCALE_ID, useValue: 'de' }],
  bootstrap: [AppComponent]
})
export class AppModule {}


