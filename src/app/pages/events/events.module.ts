import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EventsPage } from './events';
import { EventsPageRoutingModule } from './events-routing.module';

// Calendar UI Module
import { CalendarModule } from 'ion2-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventsPageRoutingModule,
    CalendarModule
  ],
  declarations: [EventsPage],
  bootstrap: [EventsPage],
})
export class EventsModule {}
