//Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';

//Others
import { UserData } from '../../services/user-data';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})

export class LoginPage {

  //Form Validation
  validation_login: FormGroup;
  isSubmitted = false;

  //Data
  public username: string = null;
  public password: string = null;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private alertCtrl: AlertController,
    private router: Router,
    private userData: UserData,
    public formBuilder: FormBuilder
  ) {
    //Validators
    this.validation_login = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  /* Error Messages
   * --------------------------------------------------------
   */
  get errorControl() {
    return this.validation_login.controls;
  }

  /* Submit
    * --------------------------------------------------------
    */
  submitForm() {
    this.isSubmitted = true;
    if (!this.validation_login.valid) {
      console.log('Please provide all the required values!')
      //Leer Meldung: Bitte geben Sie Daten ein
      return false;

    } else {
      console.log(this.validation_login.value)
      return true;
    }
  }

  /* Login 
   * --------------------------------------------------------
   */
  login() {

    let data = {
      "username": this.validation_login.value.username,
      "password": this.validation_login.value.password
    }

    //console.log(data);

    if (this.submitForm()) {

      this.auth.login(data).subscribe(async res => {
       
        if (res) {
          this.userData.login(this.validation_login.value.username);
          this.router.navigateByUrl('/app/tabs/home');

        }
      });
    }

    setTimeout(() => {
      this.validation_login.reset();
    }, 500);

  }

}
