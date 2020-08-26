import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { ModalImagePage } from '../modal-image/modal-image.page';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

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
    public modalController: ModalController,
    public formBuilder: FormBuilder
  ) { }

  defaultHref = '';

  time: FormGroup;
  isSubmitted = false;

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

  ngOnInit() {
    this.time = this.formBuilder.group({
      mo_starttime: ['', Validators.required],
      mo_endtime: ['', Validators.required],
      tu_starttime: ['', Validators.required],
      tu_endtime: ['', Validators.required],
      we_starttime: ['', Validators.required],
      we_endtime: ['', Validators.required],
      th_starttime: ['', Validators.required],
      th_endtime: ['', Validators.required],
      fr_starttime: ['', Validators.required],
      fr_endtime: ['', Validators.required],
      sa_starttime: ['', Validators.required],
      sa_endtime: ['', Validators.required],
      su_starttime: ['', Validators.required],
      su_endtime: ['', Validators.required],
    });
  }

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
      componentProps: {
        sourceType: sourceType,
        aspectRatio: 1 / 1
      }
    });

    //Passed back data
    modal.onDidDismiss()
      .then((data) => {
        this.croppedProfileImage = data['data'];
      });

    await modal.present();

    if (!window.history.state.modal) {
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
      componentProps: {
        sourceType: sourceType,
        aspectRatio: 574 / 135 
      }
    });

    //Passed back data
    modal.onDidDismiss()
      .then((data) => {
        this.croppedTitleImage = data['data'];
      });

    await modal.present();

    if (!window.history.state.modal) {
      const modalState = { modal: true };
      history.pushState(modalState, null);
    }
  }

  get errorControl() {
    return this.time.controls;
  }

  //API Call
  edit() {

    this.submitForm();
    if (this.mo_starttime > this.mo_endtime) {
      this.time.get("mo_endtime").reset();
    } else if (this.tu_starttime > this.tu_endtime) {
      this.time.get("tu_endtime").reset();
    } else if (this.we_starttime > this.we_endtime) {
      this.time.get("we_endtime").reset();
    } else if (this.th_starttime > this.th_endtime) {
      this.time.get("th_endtime").reset();
    } else if (this.fr_starttime > this.fr_endtime) {
      this.time.get("fr_endtime").reset();
    } else if (this.sa_starttime > this.sa_endtime) {
      this.time.get("sa_endtime").reset();
    } else if (this.su_starttime > this.su_endtime) {
      this.time.get("su_endtime").reset();
    } else if (this.submitForm()) {
      this.cancel();
    }

  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.time.valid) {
      return false;
    } else {
      return true;
    }
  }

  cancel() {
    this.router.navigateByUrl('/account');
  }

}
