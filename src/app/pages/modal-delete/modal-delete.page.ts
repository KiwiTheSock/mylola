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

  deleteCoupon(){ //ToDo
    console.log("Coupon gelöscht!");
    this.dismiss();
  }

  
  dismiss() {
    this.modalCtrl.dismiss({ 'dismissed': true });
  }

}
