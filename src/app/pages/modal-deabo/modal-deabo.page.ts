import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-deabo',
  templateUrl: './modal-deabo.page.html',
  styleUrls: ['./modal-deabo.page.scss'],
})
export class ModalDeaboPage implements OnInit {

  constructor(
    public modalCtrl : ModalController
  ) { }

  ngOnInit() {
  }

  deabo(){
    console.log("Deabonniert!");
    this.dismiss();
  }

  // Data passed in by componentProps
  //@Input() users: string;
  dismiss() {
    this.modalCtrl.dismiss({ 'dismissed': true });
  }

  // can "dismiss" itself and optionally pass back data
  /*
  selectUser(user: string):void {
    this.modalCtrl.dismiss(user);
  }
  */

}
