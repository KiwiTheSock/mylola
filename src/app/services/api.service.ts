//Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

//Ionic-Native
import { HTTP } from '@ionic-native/http/ngx';

//Others
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //API path
  base_path = 'http://srv06-dev.mindq.kunden.openroot.de:8088';

  //Token
  token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1OTg1MzU2MjUsImV4cCI6MTU5ODUzOTIyNSwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiRmF0b25pIn0.PyQcqaOEKayXaQ0_yMfJaYdfI-Io_wbEoTSXj_Ey-_mwHpAvc1sS62wQ0ug1BEb79S4jbNSl4IpJ_92SwPW6cp0aVSKeqNwQnBbNnYcBbOnDaqbv95bmjI65GT3sQVsIIDUkGAXir9-PZpcRuRkklzrojgBAZHry9NjMAzyxzZQSvabJVwFvD1W4EcpO9_90DbxL-s5SQn70ymHwbfovKO2lpc0jSG7ZmZzrzu1f3c4fuYTfT8jriEPWgvguyrHGJ6sqfzjyK_SEbaDEIH7zvLs1u7miGGh3SPAH4srvILgXfUpj_32RvKeiKooNjbLIfMZDa6mT2XaMOXW4t1YoJToz2si42AMP6cMykyG2UbPvEfeC4gk6q4-pJL0hcwQNi1CrvZm14kGQfprS4p0tTzq8W2viimP-MvKu79V73XTW806vmwAj8kIzviEB6aZ_X4wOcaTZJQK0SntZwDIFALk0o02WlwXJLqJz-SHGcSjBctia6IIfpthF8184IkWrJMMdiGhlsC893NVzv9l6h5oPwff1C-abxEAO0pUJmdpGVNTMTYn_jRM62qrJYWLoBzKcZpx6oLmsgxbvaiBmYq-BegfXXGDKBxeM82FzfvBYmKmg77TXtS4SEvrpgoOkpYdhHXNEaMicyzh14LKYAa63VPC1WT8B4SaMT9lXAXY';
  //token: any = null;

  data: any;

  constructor(
    private httpClient: HttpClient,
    private nativeHttp: HTTP
  ) {
    this.data = [];
  }

  /* Http Options
   * --------------------------------------------------------
   */
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + this.token
    })
  }

  /* Handle API Errors
   * --------------------------------------------------------
   */
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  /* GET
   * --------------------------------------------------------
   */

  //Companies
  getCompanies() {
    return this.httpClient
      .get(this.base_path + '/api/companies', this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Coupons
  getCoupons() {
    return this.httpClient
      .get(this.base_path + '/api/coupons', this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Customer
  getCustomers() {
    return this.httpClient
      .get(this.base_path + '/api/customers', this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Devaluations
  getDevaluations() {
    return this.httpClient
      .get(this.base_path + '/api/devaluations', this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /* GET (ID)
   * --------------------------------------------------------
   */

  //Companies
  getCompanyById(id: number) {
    return this.httpClient
      .get(this.base_path + '/api/company/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Coupons
  getCouponById(id: number) {
    return this.httpClient
      .get(this.base_path + '/api/coupon/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Customer
  getCustomerById(id: number) {
    return this.httpClient
      .get(this.base_path + '/api/customer/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Devaluations
  getDevaluationById(id: number) {
    return this.httpClient
      .get(this.base_path + '/api/' + id + '/mydevaluations', this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /* POST
   * --------------------------------------------------------
   */

  //Coupons
  addCoupon(id: number, item) {
    return this.httpClient
      .post(this.base_path + '/api/coupons/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Favorite
  addFavorite(customer_id: number, coupon_id: number, item) {
    return this.httpClient
      .post(this.base_path + '/api/favorit/' + customer_id + '/' + coupon_id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Devaluation
  addDevaluation(customer_id: number, coupon_id: number, item) {
    return this.httpClient
      .post(this.base_path + '/api/devaluation/' + customer_id + '/' + coupon_id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Hours
  addHours(id: number, item) {
    return this.httpClient
      .post(this.base_path + '/api/' + id + '/hours', JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //URL
  addURL(id: number, item) {
    return this.httpClient
      .post(this.base_path + '/api/' + id + '/url', JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /* PUT
   * --------------------------------------------------------
   */

  //Company
  updateCompany(id: number, item) {
    return this.httpClient
      .put(this.base_path + '/api/company/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Coupons
  updateCoupon(id: number, item) {
    return this.httpClient
      .put(this.base_path + '/api/coupons/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Customer
  updateCustomer(id: number, item) {
    return this.httpClient
      .put(this.base_path + '/api/customer/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

   //Hours
   updateHours(id: number, item) {
    return this.httpClient
      .put(this.base_path + '/api/' + id + '/hours/', JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //URL
  updateURL(id: number, item) {
    return this.httpClient
      .put(this.base_path + '/api/' + id + '/url/', JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /* DELETE
   * --------------------------------------------------------
   */

  //Company
  deleteCompany(id: number) {
    return this.httpClient
      .delete(this.base_path + '/api/company/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Coupons
  deleteCoupon(id: number) {
    return this.httpClient
      .delete(this.base_path + '/api/coupons/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Coupons
  deleteCustomer(id: number) {
    return this.httpClient
      .delete(this.base_path + '/api/customer/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /* Register (POST)
   * --------------------------------------------------------
   */
  register() {
    return this.httpClient
      .post(this.base_path + '/registerUser/Justus/asdf1234/justus@test.com', {})
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /* Login (POST)
   * --------------------------------------------------------
   */
  login() {

    let body = {
      "username": "Fatoni",
      "password": "asdf1234"
    }

    return this.httpClient
      .post(this.base_path + '/api/login_check', body)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

}