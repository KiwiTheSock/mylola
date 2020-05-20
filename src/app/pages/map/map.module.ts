import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MapPage } from './map';
import { FavoritesFilterPage } from '../favorites-filter/favorites-filter';
import { MapPageRoutingModule } from './map-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapPageRoutingModule
  ],
  declarations: [
    MapPage,
    FavoritesFilterPage
  ],
  entryComponents: [
    FavoritesFilterPage
  ]
})
export class MapModule { }
