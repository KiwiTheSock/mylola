import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalImagePage } from '../modal-image/modal-image.page';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage {

  titel = null;
  text = null;
  description = null;
  croppedImage = null;
  
  constructor(
    public modalController: ModalController,
    public router: Router
  ) { 
    if(this.croppedImage == "" || this.croppedImage == null){
      this.croppedImage = "../../assets/img/add/kein-bild-vorhanden-16-9.png";
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalImagePage,
      cssClass: 'modal-image-css',
      swipeToClose: true, //iOS
    });

    //Passed back data
    modal.onDidDismiss()
      .then((data) => {
        this.croppedImage = data['data']; 
    });
    
    return await modal.present();
  }

  createCoupon() {
    console.log("Created Coupon");
  }

  cancel() {
    this.titel = "";
    this.text = "";
    this.description = "";
    return this.router.navigateByUrl('/app/tabs/schedule');
  }

}
