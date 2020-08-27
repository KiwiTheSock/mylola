//Angular
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Ionic
import { ModalController, IonSlides } from '@ionic/angular'; 

//Others
import { ConferenceData } from '../../services/conference-data';

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
  
  session: any;

  //Data
  title = 'app';
  elementType = 'url';
  value = 'https://www.mylola.de/';
  used = false;

  constructor(
    public modalCtrl : ModalController,
    public dataProvider: ConferenceData,
    private route: ActivatedRoute,
    
  ) { }
  
  ionViewWillEnter() {
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
  }

  // Data passed in by componentProps
  //@Input() users: string;
  dismiss() {
    this.modalCtrl.dismiss({'dismissed': true});
  }

  // can "dismiss" itself and optionally pass back data
  /*
  selectUser(user: string):void {
    this.modalCtrl.dismiss(user);
  }
  */
}
