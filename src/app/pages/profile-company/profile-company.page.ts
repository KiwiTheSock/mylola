//Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'page-profile-company',
  templateUrl: './profile-company.page.html',
  styleUrls: ['./profile-company.page.scss'],
})
export class ProfileCompanyPage {

  constructor(
    public router: Router
  ) { }

  /* Settings
  * --------------------------------------------------------
  */
  openSettings() {
    this.router.navigateByUrl('/profile-company-edit');
  }

}
