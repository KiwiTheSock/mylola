import { Component, Input } from '@angular/core';

import { ModalController } from '@ionic/angular'; 
import { ConferenceData } from '../../providers/conference-data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage {

  used = false;

  session: any;

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
