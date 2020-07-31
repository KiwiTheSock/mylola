import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from '../../providers/user-data';
import { UserOptions } from '../../interfaces/user-options';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {
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
    this.defaultHref = `/app/tabs/schedule`;
  }

  onSignup() {
    this.auth.signIn(this.user).subscribe(user => {
     
      this.userData.login(this.user.email);
      let role = user['role'];

      if(role == 'ADMIN') {
        this.router.navigateByUrl('/app/tabs/schedule');
      } else if (role == 'USER') {
        this.router.navigateByUrl('/app/tabs/schedule');
      }
    });
    this.user.email = "";
    this.user.pw = "";
  }
}
