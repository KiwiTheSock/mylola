import { Component, ViewChild, OnInit } from '@angular/core';
import { ModalController, ActionSheetController, IonDatetime } from '@ionic/angular';
import { ModalImagePage } from '../modal-image/modal-image.page';
import { Router } from '@angular/router';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit{

  @ViewChild('start') start;
  @ViewChild('end') end;

  time: FormGroup;
  isSubmitted = false;

  titel = null;
  text = null;
  description = null;
  croppedImage = null;
  starttime = null;
  endtime = null;

  constructor(
    public modalController: ModalController,
    public router: Router,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private file: File,
    public formBuilder: FormBuilder
  ) { 
    if(this.croppedImage == "" || this.croppedImage == null){
      this.croppedImage = "../../assets/img/add/kein-bild-vorhanden-16-9.png";
    }
  }

  ngOnInit(){
    this.time = this.formBuilder.group({
      starttime: ['', Validators.required],
      endtime: ['', Validators.required],
    });
  }

  //Image
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

  //Modal
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

  get errorControl() {
    return this.time.controls;
  }

  //API Call
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

  //Cancel
  cancel() {
    this.router.navigateByUrl('/app/tabs/schedule');
  }
 
}
