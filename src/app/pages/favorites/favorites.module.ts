import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FavoritesPage } from './favorites';
import { FavoritesFilterPage } from '../favorites-filter/favorites-filter';
import { FavoritesPageRoutingModule } from './favorites-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritesPageRoutingModule
  ],
  declarations: [
    FavoritesPage,
    FavoritesFilterPage
  ],
  entryComponents: [
    FavoritesFilterPage
  ]
})
export class FavoritesModule { }
