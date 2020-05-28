import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home';
import { HomeFilterPage } from '../home-filter/home-filter';
import { PopoverPage } from '../popover/popover';
import { HomePageRoutingModule } from './home-routing.module';

import { TimePipeHome } from '../../providers/time-pipe-home.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    HomeFilterPage,
    PopoverPage,
    TimePipeHome
  ],
  entryComponents: [
    HomeFilterPage,
    PopoverPage
  ]
})
export class HomeModule { }
