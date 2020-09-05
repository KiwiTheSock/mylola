//Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';

//Others
import { UserData } from '../../services/user-data';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  styleUrls: ['./register.scss'],
})
export class RegisterPage {
  
  //API Body
  user = {
    username: "",
    email: "",
    password: ""
  }
  
  //Back Button
  defaultHref = '';

  constructor(
    private alertCtrl: AlertController,
    private auth: AuthService,
    public router: Router,
    public userData: UserData
  ) {}

  ionViewDidEnter() {
    this.defaultHref = `/app/tabs/home`;
  }

/* Register (ToDo)
 * --------------------------------------------------------
 */
  register() {
    this.auth.register(this.user).subscribe(async res => {
      
      if(res) {
        this.userData.login(this.user.username);
        console.log(res);
        this.router.navigateByUrl('/login');

      } else {
        const alert = await this.alertCtrl.create({
          header: 'Registrieren fehlgeschlagen',
          buttons: ['OK']
        });
        await alert.present();
      }
    });

    this.user.username = "";
    this.user.email = "";
    this.user.password = "";
  }
  
}
