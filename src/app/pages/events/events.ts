import { CalendarComponent } from 'ionic2-calendar/calendar';
import { Component, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { ConferenceData } from '../../providers/conference-data';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
  styleUrls: ['./events.scss'],
})
export class EventsPage {
 
  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: ''
  };
 
  eventSource = [];
  viewTitle;
 
  calendar = {
    mode: 'month',
    locale: 'de-DE',
    noEventsLabel: 'Keine Veranstaltungen',
    currentDate: new Date()
  };

  schedule: {name: string, title: string}[] = [];
 
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
 
  constructor(
    private alertCtrl: AlertController, 
    @Inject(LOCALE_ID) private locale: string,
    private dataProvider: ConferenceData, 
    ) { }
 
  ionViewDidEnter (){
    this.addEvents();
  }

  ionViewDidLeave(){
    this.removeEvents();
  }

  //Add Events
  addEvents() {

    console.log(this.schedule);

    let eventCopy = {
      title: "Test",
      desc: "Test",
      startTime: new Date("2020-05-27T10:00:00"),
      endTime: new Date("2020-05-27T12:00:00")
    }
    
    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
  }

  //Remove Events
  removeEvents(){
    this.eventSource.pop();
  }
  
  //Next month
  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }
  
  //Previous month
  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }
  
  //Focus today
  today() {
    this.calendar.currentDate = new Date();
  }
  
  //Changes the title (Month/Year)
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 
  //Alert
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);
  
    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'Von: ' + start + '<br><br>Bis: ' + end,
      buttons: ['OK']
    });
    alert.present();
  }
}
