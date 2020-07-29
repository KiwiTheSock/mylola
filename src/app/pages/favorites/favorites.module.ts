import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FavoritesPage } from './favorites';
import { FavoritesFilterPage } from '../favorites-filter/favorites-filter';
import { FavoritesPageRoutingModule } from './favorites-routing.module';

import { TimePipeFavorites } from '../../providers/time-pipe-favorites.pipe';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritesPageRoutingModule,
    SharedModule
  ],
  declarations: [
    FavoritesPage,
    FavoritesFilterPage,
    TimePipeFavorites
  ],
  entryComponents: [
    FavoritesFilterPage
  ]
})
export class FavoritesModule { }
