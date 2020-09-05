//Angular
import { Component, OnInit } from '@angular/core';

//Ionic
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-deabo',
  templateUrl: './modal-deabo.page.html',
  styleUrls: ['./modal-deabo.page.scss'],
})
export class ModalDeaboPage {

  constructor(
    public modalCtrl : ModalController
  ) { }

  deabo(){ //ToDo
    console.log("Deabonniert!");
    this.dismiss();
  }

  dismiss() {
    this.modalCtrl.dismiss({ 'dismissed': true });
  }
}
