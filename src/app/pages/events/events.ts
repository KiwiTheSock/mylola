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
  
  events: {title: string, desc: string, startTime: string, endTime: string, id: string}[] = [];

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
          endTime: event.endTime,
          id: event.id
        });
      });
    });

    this.addEvents();
  }

  ionViewWillLeave(){
    this.removeEvents();
  }
  
  //Add Events
  addEvents() {
    
    let item1 = this.events.find(i => i.id === "1");

    console.log(item1);

    let item2 = this.events.find(i => i.id === "2");

    console.log(item2);

    var counter = 1;

    for(var i = 0; i < this.events.length; i++){
      
      let item = this.events.find(i => i.id === "" + counter);

      let eventCopy = {
        title: item.title,
        desc: item.desc,
        startTime: new Date(item.startTime),
        endTime: new Date(item.endTime) 
      }

      this.eventSource.push(eventCopy);
      this.myCal.loadEvents();
      
      counter += 1;
    }
  }
  
  //Remove Events
  removeEvents(){
    for(let i = 0; i <= this.events.length; i++){
      this.events.pop();
      this.eventSource.pop();
    }
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
