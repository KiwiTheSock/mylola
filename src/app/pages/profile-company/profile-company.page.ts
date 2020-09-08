//Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';

//Ionic
import { ModalController } from '@ionic/angular';

//Others
import { ModalDeletePage } from '../modal-delete/modal-delete.page';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'page-profile-company',
  templateUrl: './profile-company.page.html',
  styleUrls: ['./profile-company.page.scss'],
})
export class ProfileCompanyPage {

  //Data
  public profile: any;
  public coupons: any;
  public hours: any;
  public url: any;
  
  public bannerfilename: any = null;
  public logofilename: any = null;

  public mo_start: string = null;
  public mo_end: string = null;

  public tu_start: string = null;
  public tu_end: string = null;

  public we_start: string = null;
  public we_end: string = null;

  public th_start: string = null;
  public th_end: string = null;

  public fr_start: string = null;
  public fr_end: string = null; 

  public sa_start: string = null;
  public sa_end: string = null;

  public su_start: string = null;
  public su_end: string = null;

  constructor(
    private apiService: ApiService,
    public router: Router,
    private modalController: ModalController
  ) { }

  ionViewWillEnter() {
    this.apiService.getCompanyByIdentifier().subscribe((res: any) => {

      //console.log(res.body);

      this.profile = res.body[0];
      this.coupons = res.body.coupons;
      this.hours = res.body[1].hours;
      this.url = res.body[1].url;

      //console.log(res[0].bannerfilename)

      //this.bannerfilename = "http://srv06-dev.mindq.kunden.openroot.de:8088/uploads/banner/" + res[0].bannerfilename;
      //this.logofilename = "http://srv06-dev.mindq.kunden.openroot.de:8088/uploads/logo/" + res[0].logofilename;
      
      this.mo_start = (this.hours.monday.split(" - ")[0]);
      this.mo_end = (this.hours.monday.split(" - ")[1]);

      this.tu_start = (this.hours.tuesday.split(" - ")[0]);
      this.tu_end = (this.hours.tuesday.split(" - ")[1]);

      this.we_start = (this.hours.wednesday.split(" - ")[0]);
      this.we_end = (this.hours.wednesday.split(" - ")[1]);

      this.th_start = (this.hours.thursday.split(" - ")[0]);
      this.th_end = (this.hours.thursday.split(" - ")[1]);

      this.fr_start = (this.hours.friday.split(" - ")[0]);
      this.fr_end = (this.hours.friday.split(" - ")[1]);

      this.sa_start = (this.hours.saturday.split(" - ")[0]);
      this.sa_end = (this.hours.saturday.split(" - ")[1]);

      this.su_start = (this.hours.sunday.split(" - ")[0]);
      this.su_end = (this.hours.sunday.split(" - ")[1]);
    })
  }

  /* Get Hours and Minutes
  * --------------------------------------------------------
  */
  time(date: any) {
    return new Date(date).toLocaleTimeString().slice(0, -3);
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
