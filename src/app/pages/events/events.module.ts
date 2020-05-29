import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EventsPage } from './events';
import { EventsPageRoutingModule } from './events-routing.module';

import { NgCalendarModule } from 'ionic2-calendar'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgCalendarModule,
    EventsPageRoutingModule,
  ],
  declarations: [EventsPage],
  bootstrap: [EventsPage],
})
export class EventsModule {}
