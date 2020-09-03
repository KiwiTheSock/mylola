import { CalendarComponent } from 'ionic2-calendar/calendar';
import { Component, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ConferenceData } from '../../services/conference-data';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
  styleUrls: ['./events.scss'],
})
export class EventsPage {
  
  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  events: {title: string, desc: string, startTime: string, endTime: string, id: string}[] = [];

  event = {
    id: '',
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

  //Data
  public startDate: string = null;
  public endDate: string = null;
 
  constructor(
    private alertCtrl: AlertController, 
    @Inject(LOCALE_ID) private locale: string,
    private dataProvider: ConferenceData, 
    private router: Router,
    private apiService: ApiService
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
  
  /* Add Events
   * --------------------------------------------------------
   */
  addEvents() {
    
    this.apiService.getCouponById(1).subscribe((res: any) => {
      console.log(res);
      this.startDate = res.startDate;
      this.endDate = res.endDate;
    })

    let item1 = this.events.find(i => i.id === "1");
    let item2 = this.events.find(i => i.id === "2");
    var counter = 1;

    for(var i = 0; i < this.events.length; i++){
      
      let item = this.events.find(i => i.id === "" + counter);

      let eventCopy = {
        id: item.id,
        title: item.title,
        desc: item.desc,
        startTime: new Date(this.startDate),
        endTime: new Date(this.endDate)
      }

      this.eventSource.push(eventCopy);
      this.myCal.loadEvents();
      
      counter += 1;
    }
  }
  
  /* Remove Events
   * --------------------------------------------------------
   */
  removeEvents(){
    for(let i = 0; i <= this.events.length; i++){
      this.events.pop();
      this.eventSource.pop();
    }
  }

  /* Next Month
   * --------------------------------------------------------
   */
  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }
  
  /* Previous Month
   * --------------------------------------------------------
   */
  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }
  
  /* Get Today
   * --------------------------------------------------------
   */
  today() {
    this.calendar.currentDate = new Date();
  }
  
  /* Changes The Title (Month/Year)
   * --------------------------------------------------------
   */
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 
  onEventSelected(event) {
    this.router.navigateByUrl("/app/tabs/home/detail/" + event.id);
  }
}
