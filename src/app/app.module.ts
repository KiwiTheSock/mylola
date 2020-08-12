import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { NgModule, LOCALE_ID } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';

//Language
import localeDe from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeDe);

//imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalPageModule } from './pages/modal/modal.module';
import { NgCalendarModule } from 'ionic2-calendar'; 
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { SharedModule } from './directives/shared.module';

//providers
import { Camera } from "@ionic-native/camera/ngx";
import { Darkmode } from './services/darkmode';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NavParams } from '@ionic/angular';
import { Refresher } from './services/refresher';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule, 
    FormsModule,
    HttpClientModule,
    ModalPageModule,
    NgCalendarModule,
    NgxChartsModule,
    SharedModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  declarations: [AppComponent],
  providers: [
    Camera, 
    Darkmode,
    InAppBrowser, 
    NavParams, 
    Refresher, 
    SocialSharing, 
    SplashScreen, 
    StatusBar, 
    { provide: LOCALE_ID, useValue: 'de' }],
  bootstrap: [AppComponent]
})
export class AppModule {}


