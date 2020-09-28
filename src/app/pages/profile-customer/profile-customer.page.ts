//Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    private modalController: ModalController
  ) { }

  /* Data
   * --------------------------------------------------------
   */
  ngOnInit(){
    this.getData();
  }

  ionViewWillEnter() {
    this.getData();
  }

  getData(){
    this.apiService.getCustomerByIdentifier().subscribe((res: any) => {
      let jsonResult = JSON.parse(JSON.stringify(res));
      this.profile = jsonResult.body;
    });

    this.apiService.getMySubscribtions().subscribe((res: any) => {
      let jsonResult = JSON.parse(JSON.stringify(res));

      if (!(jsonResult.body.status == 404)) {
        this.abos = jsonResult.body;
      } else {
        this.abos = null;
      }
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
  async presentModal(company_id) {
    const modal = await this.modalController.create({
      component: ModalDeaboPage,
      cssClass: 'modal-deabo-css',
      swipeToClose: true, //iOS
      componentProps: { company_id: company_id }
    });

    modal.onDidDismiss().then(() => {
      this.ngOnInit();
    });

    await modal.present();

    if (!window.history.state.modal) {
      const modalState = { modal: true };
      history.pushState(modalState, null);
    }
  }

}
