import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.page.html',
  styleUrls: ['./modal-delete.page.scss'],
})
export class ModalDeletePage implements OnInit {

  constructor(
    private apiService: ApiService,
    public modalCtrl : ModalController
  ) { }

  ngOnInit() {
  }

  deleteCoupon(){ //ToDo
    this.apiService.deleteCoupon(1);
    this.dismiss();
  }

  
  dismiss() {
    this.modalCtrl.dismiss({ 'dismissed': true });
  }

}
