//Angular
import { Component, OnInit } from '@angular/core';

//Ionic
import { ModalController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-modal-deabo',
  templateUrl: './modal-deabo.page.html',
  styleUrls: ['./modal-deabo.page.scss'],
})
export class ModalDeaboPage {

  //Company ID
  company_id: number;

  constructor(
    public apiService: ApiService,
    public modalCtrl: ModalController
  ) { }

  deabo() {

    this.apiService.deleteSubscriber(this.company_id).subscribe(res => {
      console.log(res);
    })
    this.dismiss();
  }

  dismiss() {
    this.modalCtrl.dismiss({ 'dismissed': true });
  }
}
