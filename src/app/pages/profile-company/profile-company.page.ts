//Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConferenceData } from '../../services/conference-data';
import { ModalController } from '@ionic/angular';
import { ModalDeletePage } from '../modal-delete/modal-delete.page';

@Component({
  selector: 'page-profile-company',
  templateUrl: './profile-company.page.html',
  styleUrls: ['./profile-company.page.scss'],
})
export class ProfileCompanyPage {

  coupons: any = [
    {
      name: "Vino & Kino"
    }
  ]

  constructor(
    public router: Router,
    private modalController: ModalController
  ) { }

  /* Settings
  * --------------------------------------------------------
  */
  openSettings() {
    this.router.navigateByUrl('/profile-company-edit');
  }

  /* Logout Modal
  * --------------------------------------------------------
  */
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalDeletePage,
      cssClass: 'modal-delete-css',
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
