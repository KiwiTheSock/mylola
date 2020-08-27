//Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-customer',
  templateUrl: './profile-customer.page.html',
  styleUrls: ['./profile-customer.page.scss'],
})
export class ProfileCustomerPage {

  constructor(
    private router: Router
  ) { }

  /* Settings
  * --------------------------------------------------------
  */
  openSettings() {
    this.router.navigateByUrl("/profile-customer-edit");
  }

}
