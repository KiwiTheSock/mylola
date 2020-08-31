//Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConferenceData } from '../../services/conference-data';

@Component({
  selector: 'app-profile-customer',
  templateUrl: './profile-customer.page.html',
  styleUrls: ['./profile-customer.page.scss'],
})
export class ProfileCustomerPage {

  abos: any;

  constructor(
    private router: Router,
    private dataProvider: ConferenceData
  ) { }

  ionViewWillEnter() {
    this.dataProvider.getAbos().subscribe((data: any) => {
      this.abos = data;
    })
  }

  /* Settings
  * --------------------------------------------------------
  */
  openSettings() {
    this.router.navigateByUrl("/profile-customer-edit");
  }

  deabo(){
    console.log("Deabonniert!");
  }



}
