import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { ModalImagePage } from '../modal-image/modal-image.page';

@Component({
  selector: 'app-detail-edit',
  templateUrl: './detail-edit.page.html',
  styleUrls: ['./detail-edit.page.scss'],
})
export class DetailEditPage implements OnInit {

  defaultHref = "";

  croppedImage = "../assets/img/add/halloffame_vinokino.png";

  //Data
  public title: string = "Vino & Kino, Dienstag 11.02 19:30 Uhr";
  public text: string = "Gratis Popcorn";
  public description: string = "Gute Weine – besondere Filme – gemütliches Ambiente\n\nEs gibt schöne Dinge im Leben - gute Filme und guter Wein gehören für uns von der Hall of Fame - Kino de Luxe dazu\nund wenn man sie kombiniert, kommen oft unvergleichliche Abende dabei heraus! Und genau diese wollen wir Ihnen mit unserer neuen Veranstaltungsreihe VINO & KINO bieten - in wohltuend entschleunigter Atmosphäre und persönlichem Ambiente! In einem unserer gemütlichen Kinosäle laden wir dienstags um 19:30 Uhr zum Empfang mit guten Weinen zur Einstimmung auf einen besonderen Film, speziell ausgewählt für diese Reihe!\n\n\nExklusiv für mylola-Nutzer: Zeigen Sie folgenden Gutschein, für eine kleine Portion Popcorn gratis, an der Kasse vor.";
  public starttime = "2020-02-11T19:30:00";
  public endtime: string = "2020-02-11T23:59:00";

  //Form Validation
  time: FormGroup;
  isSubmitted = false;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    public actionSheetController: ActionSheetController,
    private camera: Camera,
    public modalController: ModalController
  ) { }

  /* Form Validation
   * --------------------------------------------------------
   */
  ngOnInit() {
    this.time = this.formBuilder.group({
      starttime: ['', Validators.required],
      endtime: ['', Validators.required],
    });
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

  /* Errors
   * --------------------------------------------------------
   */
  get errorControl() {
    return this.time.controls;
  }

  /* Coupon Edit
   * --------------------------------------------------------
   */
  editCoupon() {
    this.submitForm();
    if (new Date(this.starttime) > new Date(this.endtime)) {
      this.time.get("endtime").reset();
    } else if (this.submitForm()) {
      this.cancel();
    }
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.time.valid) {
      return false;
    } else {
      return true;
    }
  }

  cancel() {
    this.router.navigateByUrl("/app/tabs/schedule/detail/1");
  }

}
