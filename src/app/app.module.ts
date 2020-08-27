//Angular
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import localeDe from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';
import { NgModule, LOCALE_ID } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';

//Ionic
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { NavParams } from '@ionic/angular';

//Ionic-Native
import { Camera } from "@ionic-native/camera/ngx";
import { File } from '@ionic-native/file/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

//Language
registerLocaleData(localeDe);

//Others
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Darkmode } from './services/darkmode';
import { environment } from '../environments/environment';
import { ModalPageModule } from './pages/modal/modal.module';
import { NgCalendarModule } from 'ionic2-calendar'; 
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { Refresher } from './services/refresher';
import { SharedModule } from './directives/shared.module';

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
    ReactiveFormsModule,
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
    File,
    HTTP,
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


