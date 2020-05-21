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

  /*
  location = 'madison';
  conferenceDate = '2047-05-17';

  selectOptions = {
    header: 'Select a Location'
  };
  */
 
  constructor() { }

  onChange($event) {
    console.log($event);
  }
}
