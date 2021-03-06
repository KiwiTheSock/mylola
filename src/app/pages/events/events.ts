//Angular
import { Component, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';

//Others
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
  styleUrls: ['./events.scss'],
})
export class EventsPage {

  //Calendar
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
  public title: string = null;
  public startDate: Date = null;
  public endDate: Date = null;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private router: Router,
    private apiService: ApiService
  ) { }

  ionViewWillEnter() {
    this.getData();
  }

  /* Get Data
   * --------------------------------------------------------
   */
  getData() {
    this.apiService.getCoupons().subscribe((res: any) => {
      let jsonResult = JSON.parse(JSON.stringify(res));

      for (let i = 0; i < jsonResult.body.length; i++) {
        if (jsonResult.body[i].isEvent) {

          this.id = jsonResult.body[i].id
          this.title = jsonResult.body[i].title;
          this.startDate = new Date(jsonResult.body[i].startDate);
          this.endDate = new Date(jsonResult.body[i].endDate);

          let eventCopy = {
            id: this.id,
            title: this.title,
            startTime: this.startDate,
            endTime: this.endDate
          }

          this.eventSource.push(eventCopy);
        }

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
