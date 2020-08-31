//Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConferenceData } from '../../services/conference-data';
import { ModalDeaboPage } from '../modal-deabo/modal-deabo.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile-customer',
  templateUrl: './profile-customer.page.html',
  styleUrls: ['./profile-customer.page.scss'],
})
export class ProfileCustomerPage {

  abos: any;

  constructor(
    private router: Router,
    private dataProvider: ConferenceData,
    private modalController: ModalController
  ) { }

  ionViewWillEnter() {
    this.dataProvider.getAbos().subscribe((data: any) => {
      this.abos = data;
    })
  }

  /* Settings
  * --------------------------------------------------------
  */
  openSettings() {
    this.router.navigateByUrl("/profile-customer-edit");
  }

  /* Deabo Modal
  * --------------------------------------------------------
  */
 async presentModal() {
  const modal = await this.modalController.create({
    component: ModalDeaboPage,
    cssClass: 'modal-deabo-css',
    swipeToClose: true, //iOS
    componentProps: {}
  });

  await modal.present();

  if (!window.history.state.modal) {
    const modalState = { modal: true };
    history.pushState(modalState, null);
  }
}



}
