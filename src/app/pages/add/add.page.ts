import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalImagePage } from '../modal-image/modal-image.page';


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage {

  croppedImage = null;
  
  constructor(
    public modalController: ModalController
  ) { }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalImagePage,
      cssClass: 'my-custom-class',
      swipeToClose: true, //iOS
    });

    //Passed back data
    modal.onDidDismiss()
      .then((data) => {
        this.croppedImage = data['data']; 
    });
    
    return await modal.present();
  }

}
