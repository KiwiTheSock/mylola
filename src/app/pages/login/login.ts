//Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';

//Others
import { UserData } from '../../services/user-data';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { AlertController } from '@ionic/angular';


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

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private alertCtrl: AlertController,
    private router: Router,
    private userData: UserData,
  ) { }

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
