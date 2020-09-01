//Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConferenceData } from '../../services/conference-data';
import { ModalController } from '@ionic/angular';
import { ModalDeletePage } from '../modal-delete/modal-delete.page';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'page-profile-company',
  templateUrl: './profile-company.page.html',
  styleUrls: ['./profile-company.page.scss'],
})
export class ProfileCompanyPage {

  profile: any;
  coupons: any;

  constructor(
    private apiService: ApiService,
    public router: Router,
    private modalController: ModalController
  ) { }

  ionViewWillEnter() {
    this.apiService.getCompanyById(1).subscribe((res: any) => {
      this.profile = res;
      this.coupons = res.coupons;
    })
  }

  /* Settings
  * --------------------------------------------------------
  */
  openSettings() {
    this.router.navigateByUrl('/profile-company-edit');
  }

  /* Delete Modal
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
