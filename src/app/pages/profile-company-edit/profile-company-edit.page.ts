//Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

//Ionic
import { ActionSheetController, ModalController, Platform } from '@ionic/angular';

//Ionic-Native
import { Camera } from '@ionic-native/camera/ngx';

//Others
import { ModalImagePage } from '../modal-image/modal-image.page';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-profile-company-edit',
  templateUrl: './profile-company-edit.page.html',
  styleUrls: ['./profile-company-edit.page.scss'],
})
export class ProfileCompanyEditPage {

  //Back Button
  defaultHref = '';

  //Form Validation
  validation_profileCompany: FormGroup;
  isSubmitted = false;

  //CroppedImages
  croppedLogoImage;
  croppedBannerImage;

  //Data
  public name: string = null;
  public street: string = null;
  public housenumber: string = null;
  public postcode: string = null;
  public place: string = null;
  public homepage: string = null;
  public telephone: string = null;
  public facebook: string = null;
  public instagram: string = null;
  public twitter: string = null;
  public bannerFilename: string = null;
  public logoFilename: string = null;

  //Monday
  public mo_starttime: string = null;
  public mo_endtime: string = null;
  public mo_check: boolean = false;

  //Tuesday
  public tu_starttime: string = null;
  public tu_endtime: string = null;
  public tu_check: boolean = false;

  //Wednesday
  public we_starttime: string = null;
  public we_endtime: string = null;
  public we_check: boolean = false;

  //Thursday
  public th_starttime: string = null;
  public th_endtime: string = null;
  public th_check: boolean = false;

  //Friday
  public fr_starttime: string = null;
  public fr_endtime: string = null;
  public fr_check: boolean = false;

  //Saturday
  public sa_starttime: string = null;
  public sa_endtime: string = null;
  public sa_check: boolean = false;

  //Sunday
  public su_starttime: string = null;
  public su_endtime: string = null;
  public su_check: boolean = false;

  constructor(
    private apiService: ApiService,
    private router: Router,
    public actionSheetController: ActionSheetController,
    private camera: Camera,
    public modalController: ModalController,
    public formBuilder: FormBuilder,
    private platform: Platform
  ) {
    //Validators
    this.validation_profileCompany = this.formBuilder.group({
      name: ['', Validators.required],
      street: ['', Validators.required],
      housenumber: ['', Validators.required],
      postcode: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{5}$')])],
      place: ['', Validators.required],
      homepage: ['', Validators.required],
      telephone: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]+$')])],
      facebook: ['', []],
      instagram: ['', []],
      twitter: ['', []],
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

    if (this.croppedLogoImage == null || this.croppedLogoImage == "") {
      this.croppedLogoImage = "http://srv06-dev.mindq.kunden.openroot.de:8088/uploads/kein_bild_vorhanden.png";
    }

    if (this.croppedBannerImage == null || this.croppedBannerImage == "") {
      this.croppedLogoImage = "http://srv06-dev.mindq.kunden.openroot.de:8088/uploads/kein_bild_vorhanden.png";
    }
  }

  /* Data
   * --------------------------------------------------------
   */
  ionViewWillEnter() {
    this.apiService.getCompany().subscribe((res: any) => {

      let jsonResult = JSON.parse(JSON.stringify(res));
      console.log(jsonResult);

      this.name = jsonResult.body.name;
      this.street = jsonResult.body.street;
      this.housenumber = jsonResult.body.housenumber;
      this.postcode = jsonResult.body.postcode;
      this.place = jsonResult.body.place;
      this.homepage = jsonResult.body.urls.homepage;
      this.telephone = jsonResult.body.telephone;
      this.facebook = jsonResult.body.urls.facebook;
      this.instagram = jsonResult.body.urls.instagram;
      this.twitter = jsonResult.body.urls.twitter;
      this.croppedBannerImage = "http://srv06-dev.mindq.kunden.openroot.de:8088/uploads/banners/" + jsonResult.body.bannerFilename;
      this.croppedLogoImage = "http://srv06-dev.mindq.kunden.openroot.de:8088/uploads/logos/" + jsonResult.body.logoFilename;


      //Monday
      if (jsonResult.body.hours.monday == "Geschlossen") {
        console.log("true");
        this.mo_starttime = "00:00";
        this.mo_endtime = "00:00";
      } else {
        this.mo_starttime = jsonResult.body.hours.monday.split(" - ")[0];
        this.mo_endtime = jsonResult.body.hours.monday.split(" - ")[1];
      }

      //Tuesday
      if (jsonResult.body.hours.tuesday == "Geschlossen") {
        console.log("true");
        this.tu_starttime = "00:00";
        this.tu_endtime = "00:00";
      } else {
        this.tu_starttime = jsonResult.body.hours.tuesday.split(" - ")[0];
        this.tu_endtime = jsonResult.body.hours.tuesday.split(" - ")[1];
      }

      //Wednesday
      if (jsonResult.body.hours.wednesday == "Geschlossen") {
        console.log("true");
        this.we_starttime = "00:00";
        this.we_endtime = "00:00";
      } else {
        this.we_starttime = jsonResult.body.hours.wednesday.split(" - ")[0];
        this.we_endtime = jsonResult.body.hours.wednesday.split(" - ")[1];
      }

      //Thursday
      if (jsonResult.body.hours.thursday == "Geschlossen") {
        console.log("true");
        this.th_starttime = "00:00";
        this.th_endtime = "00:00";
      } else {
        this.th_starttime = jsonResult.body.hours.thursday.split(" - ")[0];
        this.th_endtime = jsonResult.body.hours.thursday.split(" - ")[1];
      }

      //Friday
      if (jsonResult.body.hours.friday == "Geschlossen") {
        console.log("true");
        this.fr_starttime = "00:00";
        this.fr_endtime = "00:00";
      } else {
        this.fr_starttime = jsonResult.body.hours.friday.split(" - ")[0];
        this.fr_endtime = jsonResult.body.hours.friday.split(" - ")[1];
      }

      //Saturday
      if (jsonResult.body.hours.saturday == "Geschlossen") {
        console.log("true");
        this.sa_starttime = "00:00";
        this.sa_endtime = "00:00";
      } else {
        this.sa_starttime = jsonResult.body.hours.saturday.split(" - ")[0];
        this.sa_endtime = jsonResult.body.hours.saturday.split(" - ")[1];
      }

      //Sunday
      if (jsonResult.body.hours.sunday == "Geschlossen") {
        console.log("true");
        this.su_starttime = "00:00";
        this.su_endtime = "00:00";
      } else {
        this.su_starttime = jsonResult.body.hours.sunday.split(" - ")[0];
        this.su_endtime = jsonResult.body.hours.sunday.split(" - ")[1];
      }
    })
  }

  /* Profile Image
  * --------------------------------------------------------
  */
  async profilePicture() {
    if (this.platform.is("ios")) {
      this.presentModalLogo(this.camera.PictureSourceType.PHOTOLIBRARY);
    } else {
      const actionSheet = await this.actionSheetController.create({
        header: "Bildquelle auswählen",
        buttons: [{
          text: 'Aus der Bibliothek laden',
          handler: () => {
            this.presentModalLogo(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Kamera benutzen',
          handler: () => {
            this.presentModalLogo(this.camera.PictureSourceType.CAMERA);
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
  }

  /* Title Image
  * --------------------------------------------------------
  */
  async titlePicture() {
    if (this.platform.is("ios")) {
      this.presentModalLogo(this.camera.PictureSourceType.PHOTOLIBRARY);
    } else {
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
  }

  /* Modal Profile Image
  * --------------------------------------------------------
  */
  async presentModalLogo(sourceType) {
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
        this.croppedLogoImage = data['data'];
      });

    await modal.present();

    if (!window.history.state.modal) {
      const modalState = { modal: true };
      history.pushState(modalState, null);
    }
  }

  /* Modal Title Image
  * --------------------------------------------------------
  */
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
        this.croppedBannerImage = data['data'];
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
    return this.validation_profileCompany.controls;
  }

  /* Submit
   * --------------------------------------------------------
   */
  submitForm() {
    this.isSubmitted = true;
    if (!this.validation_profileCompany.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.validation_profileCompany.value)
      return true;
    }
  }

  /* Edit (API Call)
  * --------------------------------------------------------
  */
  edit() {

    let data = {
      "name": this.validation_profileCompany.value.name,
      "street": this.validation_profileCompany.value.street,
      "housenumber": this.validation_profileCompany.value.housenumber,
      "postcode": this.validation_profileCompany.value.postcode,
      "place": this.validation_profileCompany.value.place,
      "telephone": this.validation_profileCompany.value.telephone
    }

    let url = {
      "homepage": this.validation_profileCompany.value.homepage,
      "facebook": this.validation_profileCompany.value.facebook,
      "instagram": this.validation_profileCompany.value.instagram,
      "twitter": this.validation_profileCompany.value.twitter
    }

    let monday;
    if (this.validation_profileCompany.value.mo_starttime == '00:00' && this.validation_profileCompany.value.mo_endtime == '00:00') {
      monday = "Geschlossen";
    } else {
      monday = this.validation_profileCompany.value.mo_starttime + " - " + this.validation_profileCompany.value.mo_endtime;
    }
    let tuesday;
    if (this.validation_profileCompany.value.tu_starttime == '00:00' && this.validation_profileCompany.value.tu_endtime == '00:00') {
      tuesday = "Geschlossen";
    } else {
      tuesday = this.validation_profileCompany.value.tu_starttime + " - " + this.validation_profileCompany.value.tu_endtime;
    }
    let wednesday;
    if (this.validation_profileCompany.value.we_starttime == '00:00' && this.validation_profileCompany.value.we_endtime == '00:00') {
      wednesday = "Geschlossen";
    } else {
      wednesday = this.validation_profileCompany.value.we_starttime + " - " + this.validation_profileCompany.value.we_endtime
    }
    let thursday;
    if (this.validation_profileCompany.value.th_starttime == '00:00' && this.validation_profileCompany.value.th_endtime == '00:00') {
      thursday = "Geschlossen";
    } else {
      thursday = this.validation_profileCompany.value.th_starttime + " - " + this.validation_profileCompany.value.th_endtime
    }
    let friday;
    if (this.validation_profileCompany.value.fr_starttime == '00:00' && this.validation_profileCompany.value.fr_endtime == '00:00') {
      friday = "Geschlossen";
    } else {
      friday = this.validation_profileCompany.value.fr_starttime + " - " + this.validation_profileCompany.value.fr_endtime
    }
    let saturday
    if (this.validation_profileCompany.value.sa_starttime == '00:00' && this.validation_profileCompany.value.sa_endtime == '00:00') {
      saturday = "Geschlossen";
    } else {
      saturday = this.validation_profileCompany.value.sa_starttime + " - " + this.validation_profileCompany.value.sa_endtime
    }
    let sunday;
    if (this.validation_profileCompany.value.su_starttime == '00:00' && this.validation_profileCompany.value.su_endtime == '00:00') {
      sunday = "Geschlossen";
    } else {
      sunday = this.validation_profileCompany.value.su_starttime + " - " + this.validation_profileCompany.value.su_endtime
    }

    let hours = {
      "monday": monday,
      "tuesday": tuesday,
      "wednesday": wednesday,
      "thursday": thursday,
      "friday": friday,
      "saturday": saturday,
      "sunday": sunday
    }

    //console.log(hours);

    //Image Banner
    let base64Image, imageData;
    let formData = new FormData();

    if (this.croppedBannerImage.includes("data")) {
      base64Image = this.croppedBannerImage;
      imageData = this.dataURItoBlob(base64Image);
      formData.append('bannerFilename', imageData, "bannerFilename.png");
    }

    //Image Logo
    let base64Image2, imageData2;
    let formData2 = new FormData();

    if (this.croppedLogoImage.includes("data")) {
      base64Image2 = this.croppedLogoImage;
      imageData2 = this.dataURItoBlob(base64Image2);
      formData2.append('logoFilename', imageData2, "logoFilename.png");
    }

    //console.log(data);

    if (this.submitForm()) {
      this.apiService.updateCompany(data).subscribe(response => {
        console.log(response);
      })
      this.apiService.updateURL(url).subscribe(response => {
        console.log(response);
      })
      this.apiService.updateHours(hours).subscribe(response => {
        console.log(response);
      })
      if (this.croppedBannerImage.includes("data")) {
        this.apiService.updateCompanyBanner(formData).subscribe(response => {
          console.log(response);
        })
      }
      if (this.croppedLogoImage.includes("data")) {
        this.apiService.updateCompanyLogo(formData2).subscribe(response => {
          console.log(response);
        })
      }

      setTimeout(() => {
        console.log('Verarbeite Daten');
        this.router.navigateByUrl('/profile-company');
      }, 500);
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