import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.page.html',
  styleUrls: ['./modal-delete.page.scss'],
})
export class ModalDeletePage implements OnInit {

  //Coupon ID
  coupon_id: number;

  constructor(
    private apiService: ApiService,
    public modalCtrl : ModalController
  ) { }

  ngOnInit() {
  }

  /* Delete Coupon 
   * --------------------------------------------------------
   */
  deleteCoupon(){
    this.apiService.deleteCoupon(this.coupon_id).subscribe(res => {
      console.log(res);
    })
    this.dismiss();
  }

  /* Dismiss modal 
   * --------------------------------------------------------
   */
  dismiss() {
    this.modalCtrl.dismiss({ 'dismissed': true });
  }

}
