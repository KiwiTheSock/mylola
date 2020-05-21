import { Component } from '@angular/core';



@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  styleUrls: ['./about.scss'],
})
export class AboutPage {

  //Calendar
  date: string;
  type: 'string';

  location = 'madison';
  conferenceDate = '2047-05-17';

  selectOptions = {
    header: 'Select a Location'
  };

  constructor() { }

  onChange($event) {
    console.log($event);
  }
}
