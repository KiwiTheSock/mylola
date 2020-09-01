//Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';

//Others
import { UserData } from '../../services/user-data';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AlertController } from '@ionic/angular';

const helper = new JwtHelperService();
const TOKEN_KEY = 'jwt-token';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})

export class LoginPage {

  //API Body
  user = {
    username: "",
    password: ""
  }

  //Back Button
  defaultHref = '';

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private alertCtrl: AlertController,
    private router: Router,
    private userData: UserData
  ) { }

  //Back Button
  ionViewDidEnter() {
    this.defaultHref = `/app/tabs/home`;
  }

  /* Login 
   * --------------------------------------------------------
   */
  login() { 
    
    this.auth.login(this.user).subscribe(async res => {
      if (res) {
        this.userData.login(this.user.username);
        this.router.navigateByUrl('/app/tabs/home');
      } else {
        const alert = await this.alertCtrl.create({
          header: 'Login Failed',
          message: 'Wrong credentials.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
    
    this.user.username = "";
    this.user.password = "";
  }

}
