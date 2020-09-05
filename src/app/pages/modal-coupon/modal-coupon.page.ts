//Angular
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Ionic
import { ModalController, IonSlides } from '@ionic/angular';

//Others
import { ConferenceData } from '../../services/conference-data';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-modal-coupon',
  templateUrl: './modal-coupon.page.html',
  styleUrls: ['./modal-coupon.page.scss'],
})
export class ModalCouponPage {

  //Slides
  @ViewChild('slides', { static: true }) slides: IonSlides;
  slideOptions = {
    loop: true
  };

  //ToDo
  session: any;

  //Data //ToDo
  title = 'app';
  elementType = 'url';
  value = 'https://www.mylola.de/';
  used = false;

  constructor(
    private apiService: ApiService,
    public modalCtrl: ModalController,
    public dataProvider: ConferenceData,
    private route: ActivatedRoute,

  ) { }

  ionViewWillEnter() { //ToDo

    this.dataProvider.load().subscribe((data: any) => {
      if (data && data.schedule && data.schedule[0] && data.schedule[0].groups) {
        const sessionId = this.route.snapshot.paramMap.get('sessionId');
        for (const group of data.schedule[0].groups) {
          if (group && group.sessions) {
            for (const session of group.sessions) {
              if (session && session.id === sessionId) {
                this.session = session;
                break;
              }
            }
          }
        }
      }
    });
    
    this.apiService.getCouponById(1).subscribe(res => {
      this.session = res;
    });
  }

  dismiss() {

    var customer_id = 1;
    var coupon_id = 1;
    this.apiService.addDevaluation(customer_id, coupon_id);

    this.modalCtrl.dismiss({ 'dismissed': true });
  }
}
