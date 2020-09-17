//Angular
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';

//Ionic
import { ModalController, ActionSheetController } from '@ionic/angular';

//Ionic-Native
import { Camera } from '@ionic-native/camera/ngx';

//Others
import { ApiService } from '../../services/api.service';
import { ModalImagePage } from '../modal-image/modal-image.page';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})

export class AddPage {

  //Form Validation
  validation_add: FormGroup;
  isSubmitted = false;

  //Image
  croppedImage = null;

  //Data
  public category: string = null;
  public titel: string = null;
  public catcher: string = null;
  public code: string = null;
  public description: string = null;
  public startDate: string = null;
  public endDate: string = null;
  public isEvent: string = null;

  constructor(
    public actionSheetController: ActionSheetController,
    private apiService: ApiService,
    private camera: Camera,
    public formBuilder: FormBuilder,
    public modalController: ModalController,
    public router: Router,
  ) {

    //CroppedImage
    if (this.croppedImage == "" || this.croppedImage == null) {
      this.croppedImage = "http://srv06-dev.mindq.kunden.openroot.de:8088/uploads/kein_bild_vorhanden.png";
    }

    //Validators
    this.validation_add = this.formBuilder.group({
      category: ['', Validators.required],
      titel: ['', Validators.compose([
        Validators.maxLength(35),
        Validators.required])],
      catcher: ['', Validators.compose([
        Validators.maxLength(20),
        Validators.required])],
      code: ['', Validators.compose([
        Validators.maxLength(10),
        Validators.required])],
      description: ['', Validators.compose([
        Validators.maxLength(2000),
        Validators.required
      ])],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      isEvent: ['false',]
    });
  }

  /* Image
   * --------------------------------------------------------
   */
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
      componentProps: {
        sourceType: sourceType,
        aspectRatio: 16 / 9
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        this.croppedImage = data['data'];
      });

    await modal.present();

    if (!window.history.state.modal) {
      const modalState = { modal: true };
      history.pushState(modalState, null);
    }
  }

  /* Submit
   * --------------------------------------------------------
   */
  submitForm() {
    this.isSubmitted = true;
    if (!this.validation_add.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      console.log(this.validation_add.value);
      return true;
    }
  }

  /* Error Messages
   * --------------------------------------------------------
   */
  get errorControl() {
    return this.validation_add.controls;
  }

  /* Date Format (No Milliseconds)
   * --------------------------------------------------------
   */
  time(date: any) {
    return new Date(date.split("+")[0]).toISOString().slice(0, -5) + "+" + date.split("+")[1];
  }

  /* Create Coupons (API CALL)
   * --------------------------------------------------------
   */
  createCoupon() {
    let base64Image = this.croppedImage;
    let imageData = this.dataURItoBlob(base64Image);
    let formData = new FormData();

    //FormData
    formData.append('bannerFilename', imageData, "bannerFilename.png");

    let data = {
      "category": this.validation_add.value.category,
      "title": this.validation_add.value.titel,
      "catcher": this.validation_add.value.catcher,
      "description": this.validation_add.value.description,
      "startDate": this.time(this.validation_add.value.startDate),
      "endDate": this.time(this.validation_add.value.endDate),
      "code": this.validation_add.value.code,
      "isEvent": this.validation_add.value.isEvent
    }

    if (this.submitForm() && !(this.validation_add.value.startDate > this.validation_add.value.endDate)) {

      this.apiService.addCoupon(data).subscribe((response: any) => {
        console.log(response.body.coupon_data.id);

        setTimeout(() => {
          this.apiService.updateCouponBanner(response.body.coupon_data.id, formData).subscribe((res: any) => {
            console.log(res);
          })
        }, 2000);
      })

      this.router.navigateByUrl('/app/tabs/home');

      setTimeout(() => {
        this.validation_add.reset();
      }, 500);

    } else {
      this.validation_add.get("endDate").reset();
    }
  }

  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  }

}


