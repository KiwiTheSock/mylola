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

  events: { title: string, desc: string, startTime: string, endTime: string, id: string }[] = [];

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
  public id: string = null;
  public titel: string = null;
  public startDate: Date = null;
  public endDate: Date = null;

  constructor(
    private alertCtrl: AlertController,
    @Inject(LOCALE_ID) private locale: string,

    private router: Router,
    private apiService: ApiService
  ) { }

  ionViewWillEnter() {
    this.apiService.getCoupons().subscribe((res: any) => {

      for (let i = 0; i < res.length; i++) {

        //console.log(res[i][0]);

        this.id = res[i][0].id
        this.titel = res[i][0].titel;
        this.startDate = new Date(res[i][0].startDate);
        this.endDate = new Date(res[i][0].endDate);

        let eventCopy = {
          id: this.id,
          title: this.titel,
          startTime: this.startDate,
          endTime: this.endDate
        }

        this.eventSource.push(eventCopy);

      }
    })
    this.myCal.loadEvents();
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
