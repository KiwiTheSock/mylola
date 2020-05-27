import { Component, Input } from '@angular/core';

import { ModalController } from '@ionic/angular'; 
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage {

  constructor(
    public modalCtrl : ModalController,
    
  ) { }
  
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
