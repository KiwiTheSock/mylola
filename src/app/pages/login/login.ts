//Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';

//Others
import { UserData } from '../../services/user-data';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})

export class LoginPage {

  user = {
    email: '',
    pw: ''
  }

  defaultHref = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private userData: UserData
  ){}

  ionViewDidEnter() {
    this.defaultHref = `/app/tabs/home`;
  }

  /* Login
   * --------------------------------------------------------
   */
  signIn() {
    this.auth.signIn(this.user).subscribe(user => {
     
      this.userData.login(this.user.email);
      let role = user['role'];

      if(role == 'ADMIN') {
        this.router.navigateByUrl('/app/tabs/home');
      } else if (role == 'USER') {
        this.router.navigateByUrl('/app/tabs/home');
      }
    });
    this.user.email = "";
    this.user.pw = "";
  }

}
