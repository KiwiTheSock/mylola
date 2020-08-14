import { Component } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { ModalImagePage } from '../modal-image/modal-image.page';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';

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
    public router: Router,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private file: File
  ) { 
    if(this.croppedImage == "" || this.croppedImage == null){
      this.croppedImage = "../../assets/img/add/kein-bild-vorhanden-16-9.png";
    }
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Bildquelle auswählen",
      buttons: [{
        text: 'Aus der Bibliothek laden',
        handler: () => {
          this.presentModal(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Kamera benutzen',
        handler: () => {
          this.presentModal(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Abbrechen',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  async presentModal(sourceType) {
    const modal = await this.modalController.create({
      component: ModalImagePage,
      cssClass: 'modal-image-css',
      swipeToClose: true, //iOS
      componentProps: { sourceType: sourceType }
    });

    //Passed back data
    modal.onDidDismiss()
      .then((data) => {
        this.croppedImage = data['data']; 
    });
    
    await modal.present();

    if(!window.history.state.modal) {
      const modalState = { modal: true };
      history.pushState(modalState, null);
    }
  }

  selectPicture() {
    console.log("selectPicture")
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
