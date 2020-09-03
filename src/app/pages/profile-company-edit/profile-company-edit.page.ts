//Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

//Ionic
import { ActionSheetController, ModalController } from '@ionic/angular';

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
  croppedProfileImage = "../assets/img/logo/halloffame_logo.png";
  croppedTitleImage = "../assets/img/banner/banner_halloffame.png";

  //Data
  public name: string = null;
  public street: string = null;
  public housenumber: string = null;
  public postcode: string = null;
  public place: string = null;
  public homepage: string = null;
  public email: string = null;
  public telephone: string = null;
  public facebook: string = null;
  public instagram: string = null;
  public twitter: string = null;

  //Monday
  public mo_starttime: string = null;
  public mo_endtime: string = null;

  //Tuesday
  public tu_starttime: string = null;
  public tu_endtime: string = null;

  //Wednesday
  public we_starttime: string = null;
  public we_endtime: string = null;

  //Thursday
  public th_starttime: string = null;
  public th_endtime: string = null;

  //Friday
  public fr_starttime: string = null;
  public fr_endtime: string = null;

  //Saturday
  public sa_starttime: string = null;
  public sa_endtime: string = null;

  //Sunday
  public su_starttime: string = null;
  public su_endtime: string = null;

  constructor(
    private apiService: ApiService,
    private router: Router,
    public actionSheetController: ActionSheetController,
    private camera: Camera,
    public modalController: ModalController,
    public formBuilder: FormBuilder
  ) {
    //Validators
    this.validation_profileCompany = this.formBuilder.group({
      name: ['', Validators.required],
      street: ['', Validators.required],
      housenumber: ['', Validators.required],
      postcode: ['', Validators.required],
      place: ['', Validators.required],
      homepage: ['', Validators.required],
      email: ['', Validators.required],
      telephone: ['', Validators.required],
      facebook: ['', Validators.required],
      instagram: ['', Validators.required],
      twitter: ['', Validators.required],
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
  }

  /* Data
   * --------------------------------------------------------
   */
  ionViewWillEnter() {
    this.apiService.getCompanyById(1).subscribe((res: any) => {
      this.name = res.name;
      this.street = res.street;
      this.housenumber = res.housenumber;
      this.postcode = res.postcode;
      this.place = res.place;
      this.homepage = res.url.homepage;
      this.email = res.email;
      this.telephone = res.telephone;
      this.facebook = res.url.facebook;
      this.instagram = res.url.instagram;
      this.twitter = res.url.twitter;

      //Monday
      this.mo_starttime = res.hours.monday.split(" - ")[0];
      this.mo_endtime = res.hours.monday.split(" - ")[1];

      //Tuesday
      this.tu_starttime = res.hours.tuesday.split(" - ")[0];
      this.tu_endtime = res.hours.tuesday.split(" - ")[1];

      //Wednesday
      this.we_starttime = res.hours.wednesday.split(" - ")[0];
      this.we_endtime = res.hours.wednesday.split(" - ")[1];

      //Thursday
      this.th_starttime = res.hours.thursday.split(" - ")[0];
      this.th_endtime = res.hours.thursday.split(" - ")[1];

      //Friday
      this.fr_starttime = res.hours.friday.split(" - ")[0];
      this.fr_endtime = res.hours.friday.split(" - ")[1];

      //Saturday
      this.sa_starttime = res.hours.saturday.split(" - ")[0];
      this.sa_endtime = res.hours.saturday.split(" - ")[1];

      //Sunday
      this.su_starttime = res.hours.sunday.split(" - ")[0];
      this.su_endtime = res.hours.sunday.split(" - ")[1];
    })
  }

  /* Profile Image
  * --------------------------------------------------------
  */
  async profilePicture() {
    const actionSheet = await this.actionSheetController.create({
      header: "Bildquelle auswählen",
      buttons: [{
        text: 'Aus der Bibliothek laden',
        handler: () => {
          this.presentModalProfile(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Kamera benutzen',
        handler: () => {
          this.presentModalProfile(this.camera.PictureSourceType.CAMERA);
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

  /* Title Image
  * --------------------------------------------------------
  */
  async titlePicture() {
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

  /* Modal Profile Image
  * --------------------------------------------------------
  */
  async presentModalProfile(sourceType) {
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
        this.croppedProfileImage = data['data'];
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
        this.croppedTitleImage = data['data'];
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

      if (this.mo_starttime > this.mo_endtime) {
        this.validation_profileCompany.get("mo_endtime").reset();
      } else if (this.tu_starttime > this.tu_endtime) {
        this.validation_profileCompany.get("tu_endtime").reset();
      } else if (this.we_starttime > this.we_endtime) {
        this.validation_profileCompany.get("we_endtime").reset();
      } else if (this.th_starttime > this.th_endtime) {
        this.validation_profileCompany.get("th_endtime").reset();
      } else if (this.fr_starttime > this.fr_endtime) {
        this.validation_profileCompany.get("fr_endtime").reset();
      } else if (this.sa_starttime > this.sa_endtime) {
        this.validation_profileCompany.get("sa_endtime").reset();
      } else if (this.su_starttime > this.su_endtime) {
        this.validation_profileCompany.get("su_endtime").reset();
      } 

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
      "email": this.validation_profileCompany.value.email,
      "telephone": this.validation_profileCompany.value.telephone
    }

    let url = {
      "homepage": this.validation_profileCompany.value.homepage,
      "facebook": this.validation_profileCompany.value.facebook,
      "instagram": this.validation_profileCompany.value.instagram,
      "twitter": this.validation_profileCompany.value.twitter
    }

    let hours = {
      "monday": this.validation_profileCompany.value.mo_starttime + " - " + this.validation_profileCompany.value.mo_endtime,
      "tuesday": this.validation_profileCompany.value.tu_starttime + " - " + this.validation_profileCompany.value.tu_endtime,
      "wednesday": this.validation_profileCompany.value.we_starttime + " - " + this.validation_profileCompany.value.we_endtime,
      "thursday": this.validation_profileCompany.value.th_starttime + " - " + this.validation_profileCompany.value.th_endtime,
      "friday": this.validation_profileCompany.value.fr_starttime + " - " + this.validation_profileCompany.value.fr_endtime,
      "saturday": this.validation_profileCompany.value.sa_starttime + " - " + this.validation_profileCompany.value.sa_endtime,
      "sunday": this.validation_profileCompany.value.su_starttime + " - " + this.validation_profileCompany.value.su_endtime
    }

    console.log(data);

    if (this.submitForm()) {
      this.apiService.updateCompany(1, data).subscribe(response => {
        console.log(response);
      })
      this.apiService.updateURL(1, url).subscribe(response => {
        console.log(response);
      })
      this.apiService.updateHours(1, hours).subscribe(response => {
        console.log(response);
      })
      this.router.navigateByUrl('/profile-company');
    }

    
    

  }

}
