//Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage {

  constructor(
    private router: Router
  ) { }

  defaultHref = '';

  //Data
  public name: string = "Max";
  public lastname: string = "Mustermann";
  public street: string = "Musterstraße";
  public streetnumber: string = "1";
  public postcode: string = "49078";
  public city: string = "Osnabrück";
  public email: string = "user@user.com";
  public phone: string = "017654093421";


/* Button
 * --------------------------------------------------------
 */
  save() {
    this.router.navigateByUrl('/profile');
  }

}
