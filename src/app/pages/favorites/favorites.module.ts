import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FavoritesPage } from './favorites';
import { FavoritesPageRoutingModule } from './favorites-routing.module';

import { TimePipeFavorites } from '../../services/time-pipe-favorites.pipe';

import { SharedModule } from '../../directives/shared.module';

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
    TimePipeFavorites
  ]
})
export class FavoritesModule { }
