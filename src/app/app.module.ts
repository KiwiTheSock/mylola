import { HttpClientModule } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';

import { Darkmode } from './providers/darkmode';
import { Refresher } from './providers/refresher';

import { ModalPageModule } from './pages/modal/modal.module';

import { NgCalendarModule } from 'ionic2-calendar'; 

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';

import { NavParams } from '@ionic/angular';

registerLocaleData(localeDe);

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalPageModule,
    FormsModule,
    NgCalendarModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  declarations: [AppComponent, ],
  providers: [InAppBrowser, SplashScreen, StatusBar, Darkmode, NavParams, Refresher, { provide: LOCALE_ID, useValue: 'de' }],
  bootstrap: [AppComponent]
})
export class AppModule {}


