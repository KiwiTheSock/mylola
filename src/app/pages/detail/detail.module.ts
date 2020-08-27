//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Ionic
import { IonicModule } from '@ionic/angular';

//Others
import { DetailPage } from './detail';
import { DetailPageRoutingModule } from './detail-routing.module';
import { TimePipeDetail } from '../../services/time-pipe-detail.pipe';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    DetailPageRoutingModule
  ],
  declarations: [
    DetailPage,
    TimePipeDetail,
  ]
})
export class DetailModule { }
