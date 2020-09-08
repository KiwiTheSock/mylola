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

  //Coupon ID
  coupon_id: number;
 
  //Coupon
  catcher: any;
  value: any;
  elementType = 'url';

  constructor(
    private apiService: ApiService,
    public modalCtrl: ModalController,
    public dataProvider: ConferenceData,
    private route: ActivatedRoute,
  ) { }

  ionViewWillEnter() {
    this.apiService.getCouponById(this.coupon_id).subscribe(res => {
     
      let jsonResult = JSON.parse(JSON.stringify(res));

      //console.log(jsonResult);

      this.value = jsonResult.body.code;
      this.catcher = jsonResult.body.catcher;
    });
  }

  dismiss() {

    var customer_id = 1;
    this.apiService.addDevaluation(customer_id, this.coupon_id);

    this.modalCtrl.dismiss({ 'dismissed': true });
  }
}
