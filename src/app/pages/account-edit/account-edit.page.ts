import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { ModalImagePage } from '../modal-image/modal-image.page';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.page.html',
  styleUrls: ['./account-edit.page.scss'],
})
export class AccountEditPage {

  constructor(
    private router: Router,
    public actionSheetController: ActionSheetController,
    private camera: Camera,
    public modalController: ModalController
  ) { }

  defaultHref = '';

  croppedProfileImage = "../assets/img/logo/halloffame_logo.png";
  croppedTitleImage = "../assets/img/banner/banner_halloffame.png";

  public name: string = "Hall of Fame";
  public street: string = "Theodor-Heuss-Platz";
  public streetnumber: string = "6-9";
  public postcode: string = "49074";
  public city: string = "Osnabrück";
  public website: string = "hall-of-fame.online";
  public email: string = "info@hall-of-fame.online";
  public phone: string = "038712114040";
  public facebook: string = "halloffamekinodeluxe";
  public instagram: string = "halloffameosna";
  public twitter: string = "";

  //Monday
  public mo_starttime: string = "13:30";
  public mo_endtime: string = "22:00";

  //Tuesday
  public tu_starttime: string = "13:30";
  public tu_endtime: string = "22:00";

  //Wednesday
  public we_starttime: string = "13:30";
  public we_endtime: string = "22:00";

  //Thursday
  public th_starttime: string = "13:30";
  public th_endtime: string = "22:00";

  //Friday
  public fr_starttime: string = "13:30";
  public fr_endtime: string = "24:00";

  //Saturday
  public sa_starttime: string = "10:00";
  public sa_endtime: string = "24:00";

   //Sunday
   public su_starttime: string = "10:00";
   public su_endtime: string = "23:00";

  async profilePicture() {
    const actionSheet = await this.actionSheetController.create({
      header: "Bildquelle auswählen",
      buttons: [{
        text: 'Aus der Bibliothek laden',
        handler: () => {
          this.presentModalProfile(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Kamera benutzen',
        handler: () => {
          this.presentModalProfile(this.camera.PictureSourceType.CAMERA);
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

  async titlePicture() {
    const actionSheet = await this.actionSheetController.create({
      header: "Bildquelle auswählen",
      buttons: [{
        text: 'Aus der Bibliothek laden',
        handler: () => {
          this.presentModalTitle(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Kamera benutzen',
        handler: () => {
          this.presentModalTitle(this.camera.PictureSourceType.CAMERA);
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

  //Modal ProfileImage
  async presentModalProfile(sourceType) {
    const modal = await this.modalController.create({
      component: ModalImagePage,
      cssClass: 'modal-image-css',
      swipeToClose: true, //iOS
      componentProps: { sourceType: sourceType }
    });

    //Passed back data
    modal.onDidDismiss()
      .then((data) => {
        this.croppedProfileImage = data['data']; 
    });
    
    await modal.present();

    if(!window.history.state.modal) {
      const modalState = { modal: true };
      history.pushState(modalState, null);
    }
  }

  //Modal TitleImage
  async presentModalTitle(sourceType) {
    const modal = await this.modalController.create({
      component: ModalImagePage,
      cssClass: 'modal-image-css',
      swipeToClose: true, //iOS
      componentProps: { sourceType: sourceType }
    });

    //Passed back data
    modal.onDidDismiss()
      .then((data) => {
        this.croppedTitleImage = data['data']; 
    });
    
    await modal.present();

    if(!window.history.state.modal) {
      const modalState = { modal: true };
      history.pushState(modalState, null);
    }
  }

  save() {
    this.router.navigateByUrl('/account');
  }
  
}
