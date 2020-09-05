//Angular
import { Component, ViewChild } from '@angular/core';

//Ionic
import { ModalController, Platform, NavParams } from '@ionic/angular';

//Ionic-Native
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

//Others
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.page.html',
  styleUrls: ['./modal-image.page.scss'],
})
export class ModalImagePage {

  //Images
  myImage = "../../assets/img/add/kein-bild-vorhanden-16-9.png";
  croppedImage = "../../assets/img/add/kein-bild-vorhanden-16-9.png";
  image;

  //Source Type
  sourceType = this.navParams.get('sourceType');
  
  @ViewChild(ImageCropperComponent, { static: false }) angularCropper: ImageCropperComponent;

  constructor(
    private camera: Camera,
    public modalController: ModalController,
    private platform: Platform,
    private navParams: NavParams
  ) { 
    this.captureImage();
    this.backButtonEvent();
  }

  captureImage() {

    if(this.sourceType == this.camera.PictureSourceType.PHOTOLIBRARY){
      this.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
    }
    else if(this.sourceType == this.camera.PictureSourceType.CAMERA) {
      this.sourceType = this.camera.PictureSourceType.CAMERA;
    }

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.sourceType, 
      correctOrientation: true
    }
    
    this.camera.getPicture(options).then((imageData) => { 
      this.myImage = 'data:image/jpg;base64,' + imageData;
    });
  
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  saveImage(){
    this.modalController.dismiss(this.croppedImage);
  }

  dismiss() {
    this.modalController.dismiss({ 'dismissed' : true });
  }

  backButtonEvent(){
    this.platform.backButton.subscribe(() => {
      this.modalController.dismiss("../../assets/img/add/kein-bild-vorhanden-16-9.png");
    })
  }
  

}
