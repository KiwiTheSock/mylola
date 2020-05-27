import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs-page';
import { TabsPageRoutingModule } from './tabs-page-routing.module';

import { EventsModule } from '../events/events.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { HomeModule } from '../home/home.module';
import { DetailModule } from '../detail/detail.module';

@NgModule({
  imports: [
    EventsModule,
    CommonModule,
    IonicModule,
    FavoritesModule,
    HomeModule,
    DetailModule,
    TabsPageRoutingModule
  ],
  declarations: [
    TabsPage,
  ]
})
export class TabsModule { }
