//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Ionic
import { IonicModule } from '@ionic/angular';

//Others
import { DetailPage } from './detail';
import { DetailPageRoutingModule } from './detail-routing.module';
import { SharedModule } from '../../directives/shared.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    DetailPageRoutingModule,
    SharedModule
  ],
  declarations: [
    DetailPage,
  ]
})
export class DetailModule { }
