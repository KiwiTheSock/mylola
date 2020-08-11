import { Component, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.page.html',
  styleUrls: ['./modal-image.page.scss'],
})
export class ModalImagePage {

  myImage = null;
  croppedImage = null;
  
  @ViewChild(ImageCropperComponent, { static: false }) angularCropper: ImageCropperComponent;

  constructor(
    private camera: Camera,
    public modalController: ModalController
  ) { 
    this.captureImage();
  }

  captureImage() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      correctOrientation: true
    }

    this.camera.getPicture(options).then((imageData) => {
      this.myImage = "data:image/jpeg;base64," + imageData;
    });

  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  saveImage(){
    this.modalController.dismiss(this.croppedImage);
  }

  dismiss() {
    this.modalController.dismiss({ 'dismissed': true });
  }

}
