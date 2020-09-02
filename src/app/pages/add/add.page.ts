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

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  //Form Validation
  validations_add: FormGroup;
  isSubmitted = false;

  validation_messages = {
    'titel': [
      { type: 'required', message: 'Titel wird benötigt.' },
      { type: 'maxlength', message: 'Titel ist zu lang (max. 35 Zeichen).' }
    ],
    'text': [
      { type: 'required', message: 'Abrisstext wird benötigt.' },
      { type: 'maxlength', message: 'Abrisstext ist zu lang (max. 20 Zeichen).' }
    ],
    'description': [
      { type: 'required', message: 'Beschreibung wird benötigt.' },
      { type: 'maxlength', message: 'Beschreibung ist zu lang (max. 2000 Zeichen).' }
    ],
    'starttime': [
      { type: 'required', message: 'Startzeit wird benötigt.' },
    ],
    'endtime': [
      { type: 'required', message: 'Endzeit wird benötigt.' },
    ]
  }

  //Image
  croppedImage = null;

  //Validation
  titel: FormControl;
  text: FormControl;
  description: FormControl;
  starttime;
  endtime;

  constructor(
    public actionSheetController: ActionSheetController,
    private camera: Camera,
    public formBuilder: FormBuilder,
    public modalController: ModalController,
    public router: Router,
  ) {
    //CroppedImage
    if (this.croppedImage == "" || this.croppedImage == null) {
      this.croppedImage = "../../assets/img/add/kein-bild-vorhanden-16-9.png";
    }
  }

  /* Form Validation
   * --------------------------------------------------------
   */
  ngOnInit() {

    this.titel = new FormControl('', Validators.compose([
      Validators.maxLength(35),
      Validators.required
    ]));
    this.text = new FormControl('', Validators.compose([
      Validators.maxLength(20),
      Validators.required
    ]));
    this.description = new FormControl('', Validators.compose([
      Validators.maxLength(2000),
      Validators.required
    ]));
    this.starttime = new FormControl('', Validators.required),
      this.endtime = new FormControl('', Validators.required),

      this.validations_add = this.formBuilder.group({
        titel: this.titel,
        text: this.text,
        description: this.description,
        starttime: this.starttime,
        endtime: this.endtime,
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
    return this.validations_add.controls;
  }

  /* Create Coupons (API CALL)
  * --------------------------------------------------------
  */
  createCoupon() {
    this.submitForm();
    if (new Date(this.starttime.value) > new Date(this.endtime.value)) {
      this.validations_add.get("endtime").reset();
    } else if (this.submitForm()) {
      this.cancel();
    }
  }

  submitForm() {
    this.isSubmitted = true;
    if (this.validations_add.valid) {
      return true;
    } else {
      return false;
    }
  }

  cancel() {
    this.router.navigateByUrl('/app/tabs/home');
    this.validations_add.reset();
  }

}
