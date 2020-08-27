//Angular
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';

//Ionic
import { ModalController, ActionSheetController } from '@ionic/angular';

//Ionic-Native
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';

//Others
import { ModalImagePage } from '../modal-image/modal-image.page';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit{

  //Form Validation
  time: FormGroup;
  isSubmitted = false;

  //Data
  titel = null;
  text = null;
  description = null;
  croppedImage = null;
  starttime = null;
  endtime = null;

  constructor(
    public actionSheetController: ActionSheetController,
    private camera: Camera,
    private file: File,
    public formBuilder: FormBuilder,
    public modalController: ModalController,
    public router: Router,
  ) { 
    //CroppedImage
    if(this.croppedImage == "" || this.croppedImage == null){
      this.croppedImage = "../../assets/img/add/kein-bild-vorhanden-16-9.png";
    }
  }

  /* Form Validation
   * --------------------------------------------------------
   */
  ngOnInit(){
    this.time = this.formBuilder.group({
      starttime: ['', Validators.required],
      endtime: ['', Validators.required],
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
        aspectRatio: 16/9
      }
    });

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

  /* Error Messages
  * --------------------------------------------------------
  */
  get errorControl() {
    return this.time.controls;
  }

  /* Create Coupons (API CALL)
  * --------------------------------------------------------
  */
  createCoupon() {
    this.submitForm();
    if(new Date(this.starttime) > new Date(this.endtime)){
      this.time.get("endtime").reset();
    } else if(this.submitForm()){
      this.cancel();
    }
  }

  submitForm(){
    this.isSubmitted = true;
    if (!this.time.valid) {
      return false;
    } else {
      return true;
    }
  }

  cancel() {
    this.router.navigateByUrl('/app/tabs/home');
  }
 
}
