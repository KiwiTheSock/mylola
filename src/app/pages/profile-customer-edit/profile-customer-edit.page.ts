//Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-profile-customer-edit',
  templateUrl: './profile-customer-edit.page.html',
  styleUrls: ['./profile-customer-edit.page.scss'],
})
export class ProfileCustomerEditPage {

  //Back Button
  defaultHref = '';

  //Data
  profile: any;

  public firstname: string;
  public lastname: string;
  public street: string;
  public housenumber: string;
  public postcode: string;
  public place: string;
  public email: string;
  public telephone: string;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ionViewWillEnter() {
    this.apiService.getCustomerById(1).subscribe((res: any) => {
      this.profile = res;
      //this.abos = res.abos;
      this.firstname = res.firstname; 
      this.lastname = res.lastname; 
      this.street = res.street;
      this.housenumber = res.housenumber;
      this.postcode = res.postcode;
      this.place = res.place;
      this.email = res.email;
      this.telephone = res.telephone;
    
    })
  }

/* Button
 * --------------------------------------------------------
 */
  save() {

    let data = {
      "firstname": "Test",
      "lastname": "Test",
      "street": "Test",
      "housenumber": "Test",
      "postcode": "Test",
      "place": "Test",
      "email": "Test",
      "telephone": "Test"
    }

    console.log(data);

    this.apiService.updateCustomer(1, data).subscribe(response => {
      console.log(response);
      //this.data = response;
    })
    this.router.navigateByUrl('/profile-customer');
  }

}
