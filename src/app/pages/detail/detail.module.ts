import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailPage } from './detail';
import { DetailPageRoutingModule } from './detail-routing.module';
import { IonicModule } from '@ionic/angular';

import { TimePipeDetail } from '../../providers/time-pipe-detail.pipe';

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
