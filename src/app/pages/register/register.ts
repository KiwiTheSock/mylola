//Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';

//Others
import { UserData } from '../../services/user-data';
import { AuthService } from '../../services/auth.service';
import { AlertController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  styleUrls: ['./register.scss'],
})
export class RegisterPage {


  //Form Validation
  validation_register: FormGroup;
  isSubmitted = false;

  //Data
  public username: string = null;
  public email: string = null;
  public password: string = null;
  public password2: string = null;

  //Back Button
  defaultHref = '';

  constructor(
    private alertCtrl: AlertController,
    private auth: AuthService,
    public router: Router,
    public userData: UserData,
    public formBuilder: FormBuilder,
    public toastController: ToastController
  ) {
    //Validators
    this.validation_register = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])],
      password: ['', Validators.required],
      password2: ['', Validators.required]
    })
  }

  ionViewDidEnter() {
    this.defaultHref = `/app/tabs/home`;
  }

  /* Error Messages
  * --------------------------------------------------------
  */
  get errorControl() {
    return this.validation_register.controls;
  }

  /* Submit
    * --------------------------------------------------------
    */
  submitForm() {
    this.isSubmitted = true;
    if (!this.validation_register.valid) {
      //console.log('Please provide all the required values!')
      return false;

    } else {
      console.log(this.validation_register.value)
      return true;
    }
  }

  /* Register
   * --------------------------------------------------------
   */
  register() {

    let data = {
      "username": this.validation_register.value.username,
      "password": this.validation_register.value.password,
      "email": this.validation_register.value.email,
    }

    if (this.submitForm() && (this.validation_register.value.password == this.validation_register.value.password2)) {
      this.auth.register(data).subscribe((result) => {

        if (result) {
          this.router.navigateByUrl('/login');
        }
      }, (error) => {
        //console.log(error);
        this.presentToast("Username bereits vorhanden!");
      });

      setTimeout(() => {
        this.validation_register.reset();
      }, 2000);
    } else {
      this.presentToast("Passwörter sind nicht gleich!");
      this.validation_register.get("password").reset();
      this.validation_register.get("password2").reset();
    }
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

}
