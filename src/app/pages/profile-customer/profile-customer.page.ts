//Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConferenceData } from '../../services/conference-data';
import { ModalDeaboPage } from '../modal-deabo/modal-deabo.page';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-profile-customer',
  templateUrl: './profile-customer.page.html',
  styleUrls: ['./profile-customer.page.scss'],
})
export class ProfileCustomerPage {

  abos: any;
  profile: any;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private dataProvider: ConferenceData,
    private modalController: ModalController
  ) { }

 /* Data
  * --------------------------------------------------------
  */
  ionViewWillEnter() {
    this.apiService.getCustomerByIdentifier().subscribe((res: any) => {
      this.profile = res.body;
    });
    this.apiService.getMySubscribtions().subscribe((res: any) => {
      console.log(res);
      this.abos = res.body;
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
  //id des Abos mitübergeben, im modal-deabo deabo-API Methode ausführen
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
