//Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';

//Others
import { UserData } from '../../services/user-data';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  styleUrls: ['./register.scss'],
})
export class RegisterPage {
  
  user = {
    email: '',
    pw: ''
  }
  
  defaultHref = '';

  constructor(
    private auth: AuthService,
    public router: Router,
    public userData: UserData
  ) {}

  ionViewDidEnter() {
    this.defaultHref = `/app/tabs/home`;
  }

/* Login
 * --------------------------------------------------------
 */
  onSignup() {
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
