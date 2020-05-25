import { Component } from '@angular/core';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
  styleUrls: ['./events.scss'],
})
export class EventsPage {

  //Calendar
  date: string;
  type: 'string';

  constructor() { }

  onChange($event) {
    console.log($event);
  }
}
