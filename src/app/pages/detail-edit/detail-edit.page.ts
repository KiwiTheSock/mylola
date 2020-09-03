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
  croppedImage = "../assets/img/add/halloffame_vinokino.png";

  //Data
  public category: string = null;
  public titel: string = null;
  public catcher: string = null;
  public description: string = null;
  public startDate: string = null;
  public endDate: string = null;


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
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  /* Data
   * --------------------------------------------------------
   */
  ionViewWillEnter() {
    this.apiService.getCouponById(1).subscribe((res: any) => {
      this.category = res.category.name;
      this.titel = res.titel;
      this.catcher = res.catcher;
      this.description = res.description;
      this.startDate = res.startDate;
      this.endDate = res.endDate;
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

    let data = {
      "category": this.validation_detail.value.category,
      "titel": this.validation_detail.value.titel,
      "catcher": this.validation_detail.value.catcher,
      "description": this.validation_detail.value.description,
      "startDate": this.validation_detail.value.startDate,
      "endDate": this.validation_detail.value.endDate,
      "code": ""
    }

    //console.log(data);

    if (this.submitForm() && !(this.validation_detail.value.starttime >= this.validation_detail.value.endtime)) {

      this.apiService.updateCoupon(1, data).subscribe(response => {
        console.log(response);
      })
      this.router.navigateByUrl("/app/tabs/home/detail/1");

    } else {
      this.validation_detail.get("endtime").reset();
    }
  }

}
