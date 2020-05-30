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
  
  events: {title: string, desc: string, startTime: string, endTime: string}[] = [];

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

  @ViewChild(CalendarComponent) myCal: CalendarComponent;
 
  constructor(
    private alertCtrl: AlertController, 
    @Inject(LOCALE_ID) private locale: string,
    private dataProvider: ConferenceData, 
    ) {}  

  ionViewWillEnter(){
    //Getting data
    this.dataProvider.getEvents().subscribe((events: any[]) => {
      events.forEach(event => {
        this.events.push({
          title: event.title,
          desc: event.desc,
          startTime: event.startTime,
          endTime: event.endTime
        });
      });
    });
  }
  
  ionViewDidEnter(){
    this.addEvents();
  }

  ionViewDidLeave(){
    this.removeEvents();
  }

  //Add Events
  addEvents() {

    for(let i = 0; i <= this.events.length; i++){
    
      let eventCopy = {
        title: this.events[i].title,
        desc: this.events[i].desc,
        startTime: new Date(this.events[i].startTime),
        endTime: new Date(this.events[i].endTime)
      }
      
      this.eventSource.push(eventCopy);
      this.myCal.loadEvents();
    } 
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
