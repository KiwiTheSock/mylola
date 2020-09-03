//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Ionic
import { IonicModule } from '@ionic/angular';

//Others
import { HomePage } from './home';
import { HomePageRoutingModule } from './home-routing.module';
import { SharedModule } from '../../directives/shared.module';
import { HidenavModule } from '../../hidenav/hidenav.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule,
    HidenavModule
  ],
  declarations: [
    HomePage,
  ]
})
export class HomeModule { }
