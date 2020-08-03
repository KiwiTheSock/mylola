import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home';
import { HomePageRoutingModule } from './home-routing.module';

import { TimePipeHome } from '../../services/time-pipe-home.pipe';

import { SharedModule } from '../../directives/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule
  ],
  declarations: [
    HomePage,
    TimePipeHome
  ]
})
export class HomeModule { }
