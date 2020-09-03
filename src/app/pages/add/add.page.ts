//Angular
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router } from '@angular/router';

//Ionic
import { ModalController, ActionSheetController } from '@ionic/angular';

//Ionic-Native
import { Camera } from '@ionic-native/camera/ngx';

//Others
import { ModalImagePage } from '../modal-image/modal-image.page';
import { ApiService } from '../../services/api.service';

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
  public text: string = null;
  public description: string = null;
  public starttime: string = null;
  public endtime: string = null;

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
      this.croppedImage = "../../assets/img/add/kein-bild-vorhanden-16-9.png";
    }

    //Validators
    this.validation_add = this.formBuilder.group({
      category: ['', Validators.required],
      titel: ['', Validators.compose([
        Validators.maxLength(35),
        Validators.required])],
      text: ['', Validators.compose([
        Validators.maxLength(20),
        Validators.required])],
      description: ['', Validators.compose([
        Validators.maxLength(2000),
        Validators.required
      ])],
      starttime: ['', Validators.required],
      endtime: ['', Validators.required]
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

  /* Error Messages
 * --------------------------------------------------------
 */
  get errorControl() {
    return this.validation_add.controls;
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

  /* Create Coupons (API CALL)
  * --------------------------------------------------------
  */
  createCoupon() {

    let data = {
      "category": this.validation_add.value.category,
      "titel": this.validation_add.value.titel,
      "catcher": this.validation_add.value.text,
      "description": this.validation_add.value.description,
      "startDate": this.validation_add.value.starttime,
      "endDate": this.validation_add.value.endtime,
      "code": ""
    }

    //console.log(data);

    if (this.submitForm() && !(this.validation_add.value.starttime > this.validation_add.value.endtime)) {

      this.apiService.addCoupon(1, data).subscribe(response => {
        console.log(response);
      })
      this.router.navigateByUrl('/app/tabs/home');

      setTimeout(() => {
        this.validation_add.reset();
       }, 500);

    } else {
      this.validation_add.get("endtime").reset();
    }


  }
}


