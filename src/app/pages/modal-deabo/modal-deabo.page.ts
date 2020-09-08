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

  constructor(
    public apiService: ApiService,
    public modalCtrl : ModalController
  ) { }

  deabo(){
  
    let company_id; //= this.data.body.company[0].id
    this.apiService.deleteSubscriber(company_id);
    this.dismiss();
  }

  dismiss() {
    this.modalCtrl.dismiss({ 'dismissed': true });
  }
}
