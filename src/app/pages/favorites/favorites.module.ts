//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Ionic
import { IonicModule } from '@ionic/angular';

//Others
import { FavoritesPage } from './favorites';
import { FavoritesPageRoutingModule } from './favorites-routing.module';
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
    FavoritesPage
  ]
})
export class FavoritesModule { }
