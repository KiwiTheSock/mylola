import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home';
import { HomeFilterPage } from '../home-filter/home-filter';
import { PopoverPage } from '../popover/popover';
import { HomePageRoutingModule } from './home-routing.module';

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
    PopoverPage
  ],
  entryComponents: [
    HomeFilterPage,
    PopoverPage
  ]
})
export class HomeModule { }
