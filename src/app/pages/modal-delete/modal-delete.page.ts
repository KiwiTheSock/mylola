import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.page.html',
  styleUrls: ['./modal-delete.page.scss'],
})
export class ModalDeletePage implements OnInit {

  constructor(
    public modalCtrl : ModalController
  ) { }

  ngOnInit() {
  }

  deleteCoupon(){
    console.log("Coupon gelöscht!");
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
