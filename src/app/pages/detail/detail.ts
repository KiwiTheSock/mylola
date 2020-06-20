import { Component, Inject } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT} from '@angular/common';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page'; 

@Component({
  selector: 'page-detail',
  styleUrls: ['./detail.scss'],
  templateUrl: 'detail.html'
})
export class DetailPage{

  session: any;
  defaultHref = '';
  
  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private dataProvider: ConferenceData, 
    private route: ActivatedRoute,
    public modalController : ModalController,
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

  //Modal
  async presentModal(session: any) {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'modal',
      swipeToClose: true, //iOS
      componentProps: { session: session }
    });
   
    return await modal.present();
  } 
}


