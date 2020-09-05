import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { ModalImagePage } from '../modal-image/modal-image.page';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-detail-edit',
  templateUrl: './detail-edit.page.html',
  styleUrls: ['./detail-edit.page.scss'],
})
export class DetailEditPage {

  //Form Validation
  validation_detail: FormGroup;
  isSubmitted = false;

  //Image
  croppedImage: any;

  //Data
  public category: string = null;
  public titel: string = null;
  public catcher: string = null;
  public code: string = null;
  public description: string = null;
  public startDate: string = null;
  public endDate: string = null;
  public bannerFilename: string = null;

  constructor(
    private apiService: ApiService,
    private router: Router,
    public formBuilder: FormBuilder,
    public actionSheetController: ActionSheetController,
    private camera: Camera,
    public modalController: ModalController
  ) {
    //Validators
    this.validation_detail = this.formBuilder.group({
      category: ['', Validators.required],
      titel: ['', Validators.required],
      catcher: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  /* Data
   * --------------------------------------------------------
   */
  ionViewWillEnter() {
    this.apiService.getCouponById(61).subscribe((res: any) => {
      this.category = res.category.name;
      this.titel = res.titel;
      this.catcher = res.catcher;
      this.description = res.description;
      this.startDate = res.startDate;
      this.endDate = res.endDate;
      this.code = res.code;
      this.bannerFilename = res.bannerFilename;
      this.croppedImage = "http://srv06-dev.mindq.kunden.openroot.de:8088/uploads/banner/" + res.bannerFilename;
    })

  }

  getCategory(){
    return this.category;
  }

  /* Coupon Image
   * --------------------------------------------------------
   */
  async picture() {
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

  /* Modal Coupon Image
   * --------------------------------------------------------
   */
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

    if (!window.history.state.modal) {
      const modalState = { modal: true };
      history.pushState(modalState, null);
    }
  }

  /* Error Messages
   * --------------------------------------------------------
   */
  get errorControl() {
    return this.validation_detail.controls;
  }

  /* Submit
   * --------------------------------------------------------
   */
  submitForm() {
    this.isSubmitted = true;
    if (!this.validation_detail.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      console.log(this.validation_detail.value);
      return true;
    }
  }

  /* Coupon Edit
   * --------------------------------------------------------
   */

  editCoupon() {
    let base64Image = this.croppedImage;
    let imageData = this.dataURItoBlob(base64Image);
    let formData = new FormData();
    /*
    formData.append('category', this.validation_detail.value.category);
    formData.append('titel', this.validation_detail.value.titel);
    formData.append('catcher', this.validation_detail.value.catcher);
    formData.append('description', this.validation_detail.value.description);
    formData.append('startDate', this.validation_detail.value.startDate);
    formData.append('endDate', this.validation_detail.value.endDate);
    formData.append('code', this.validation_detail.value.code);
    */
    formData.append('bannerFilename', imageData, "filename.png");
    

    let data = {
      "category": this.validation_detail.value.category,
      "titel": this.validation_detail.value.titel,
      "catcher": this.validation_detail.value.catcher,
      "description": this.validation_detail.value.description,
      "startDate": this.validation_detail.value.startDate,
      "endDate": this.validation_detail.value.endDate,
      "code": this.validation_detail.value.code,
    }

    //console.log(data);

    if (this.submitForm() && !(this.validation_detail.value.starttime >= this.validation_detail.value.endtime)) {

      /* FUNKTIONIERT NICHT */
     
      this.apiService.updateCoupon(formData).subscribe(response => {
        console.log(response);
      })

      /* FUNKTIONIERT */
       /*
      this.apiService.addImage(formData).subscribe(response => {
        console.log(response);
      })
      */

      setTimeout(() => {
        console.log('Verarbeite Daten');
        this.router.navigateByUrl("/app/tabs/home/detail/1");
      }, 500);

    } else {
      this.validation_detail.get("endtime").reset();
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
