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
  profile: any;
  public firstnameProfile: string = null;
  public lastnameProfile: string = null;
  public streetProfile: string = null;
  public housenumberProfile: string = null;
  public postcodeProfile: string = null;
  public placeProfile: string = null;
  public emailProfile: string = null;
  public telephoneProfile: string = null;

  constructor(
    private apiService: ApiService,
    public formBuilder: FormBuilder,
    private router: Router
  ) {
    this.validation_profileCustomer = this.formBuilder.group({
      firstnameProfile: ['', [Validators.required]],
      lastnameProfile: ['', [Validators.required]],
      streetProfile: ['', [Validators.required]],
      housenumberProfile: ['', [Validators.required]],
      postcodeProfile: ['', [Validators.required]],
      placeProfile: ['', [Validators.required]],
      emailProfile: ['', [Validators.required]],
      telephoneProfile: ['', [Validators.required]],
    })
  }

  ionViewWillEnter() {
    this.apiService.getCustomerById(1).subscribe((res: any) => {
      this.profile = res;
      this.firstnameProfile = res.firstname;
      this.lastnameProfile = res.lastname;
      this.streetProfile = res.street;
      this.housenumberProfile = res.housenumber;
      this.postcodeProfile = res.postcode;
      this.placeProfile = res.place;
      this.emailProfile = res.email;
      this.telephoneProfile = res.telephone;
    })
  }

  get errorControl() {
    return this.validation_profileCustomer.controls;
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.validation_profileCustomer.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.validation_profileCustomer.value)
    }
  }

  /* Save Profile
   * --------------------------------------------------------
   */
  save() {

    let data = {
      "firstname": this.validation_profileCustomer.value.firstnameProfile,
      "lastname": this.validation_profileCustomer.value.lastnameProfile,
      "street": this.validation_profileCustomer.value.streetProfile,
      "housenumber": this.validation_profileCustomer.value.housenumberProfile,
      "postcode": this.validation_profileCustomer.value.postcodeProfile,
      "place": this.validation_profileCustomer.value.placeProfile,
      "email": this.validation_profileCustomer.value.emailProfile,
      "telephone": this.validation_profileCustomer.value.telephoneProfile
    }

    console.log(data);

    this.apiService.updateCustomer(1, data).subscribe(response => {
      console.log(response);
    })
    this.router.navigateByUrl('/profile-customer');
  }

}
