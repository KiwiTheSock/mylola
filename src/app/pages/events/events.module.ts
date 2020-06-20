import { NgModule, LOCALE_ID  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EventsPage } from './events';
import { EventsPageRoutingModule } from './events-routing.module';

import { CalendarModule } from 'ion2-calendar'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarModule,
    EventsPageRoutingModule,
  ],
  declarations: [EventsPage],
  bootstrap: [EventsPage],
})
export class EventsModule {}
