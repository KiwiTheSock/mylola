//Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-profile-customer-edit',
  templateUrl: './profile-customer-edit.page.html',
  styleUrls: ['./profile-customer-edit.page.scss'],
})
export class ProfileCustomerEditPage {

  //Form Validation
  validation_profileCustomer: FormGroup;
  isSubmitted = false;

  //Back Button
  defaultHref = '';

  //Data
  public firstname: string = null;
  public lastname: string = null;
  public street: string = null;
  public housenumber: string = null;
  public postcode: string = null;
  public place: string = null;
  public email: string = null;
  public telephone: string = null;

  constructor(
    private apiService: ApiService,
    public formBuilder: FormBuilder,
    private router: Router
  ) {
    //Validators
    this.validation_profileCustomer = this.formBuilder.group({
      firstname: ['', []],
      lastname: ['', []],
      street: ['', []],
      housenumber: ['', []],
      postcode: ['', [Validators.pattern('^[0-9]{5}$')]],
      place: ['', []],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])],
      telephone: ['', [Validators.pattern('^[0-9]+$')]],
    });
  }

  /* Data
   * --------------------------------------------------------
   */
  ionViewWillEnter() {
    this.apiService.getCustomerByIdentifier().subscribe((res: any) => {
      this.firstname = res.body.firstname;
      this.lastname = res.body.lastname;
      this.street = res.body.street;
      this.housenumber = res.body.housenumber;
      this.postcode = res.body.postcode;
      this.place = res.body.place;
      this.email = res.body.email;
      this.telephone = res.body.telephone;
    })
  }

  /* Error Messages
   * --------------------------------------------------------
   */
  get errorControl() {
    return this.validation_profileCustomer.controls;
  }

  /* Submit
   * --------------------------------------------------------
   */
  submitForm() {
    this.isSubmitted = true;
    if (!this.validation_profileCustomer.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      console.log(this.validation_profileCustomer.value);
      return true;
    }
  }

  /* Save Profile (API Call)
   * --------------------------------------------------------
   */
  save() {

    let data = {
      "firstname": this.validation_profileCustomer.value.firstname,
      "lastname": this.validation_profileCustomer.value.lastname,
      "street": this.validation_profileCustomer.value.street,
      "housenumber": this.validation_profileCustomer.value.housenumber,
      "postcode": this.validation_profileCustomer.value.postcode,
      "place": this.validation_profileCustomer.value.place,
      "email": this.validation_profileCustomer.value.email,
      "telephone": this.validation_profileCustomer.value.telephone
    }

    //console.log(data);

    if (this.submitForm()) {
      this.apiService.updateCustomer(data).subscribe(response => {
        console.log(response);
      })

      setTimeout(() => {
        console.log('Verarbeite Daten');
        this.router.navigateByUrl('/profile-customer');
      }, 500);
      
    }
  }

}
