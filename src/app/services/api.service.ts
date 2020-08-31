//Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

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
  token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1OTg4NzA4NzIsImV4cCI6MTU5ODg3NDQ3Miwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiRmF0b25pIn0.vNdgPLiFjG9U0mesV4Fmp35cjLqYSkU434W0ggv-unH9SDFEV3w4ogYGmJCJZjRc2Fq0ThwHIZn-kIKOqnsSjLID0xZSIlqiC3zWwo5-gTqv4Rjpl4ock_fYv3ENEW0wujcj4pM-DDKUwRBRTja7lVu2E5QSSpvS1DEjPABCc5FJsF6HVh-vzh6qeaE69GvnwvWFEkGP-eKiVUm1O-T7e3NBvf6RBrvssZcf3t937kosbL0kq59dBYxZG2XXadNKorSKIP-QAx_NP4QcS9G_Y-AG-L92K1e9-SpIaOO0OV4UCxU9nIsVd-RsptQMiB-hedSFkd0KCrgNkJX-mCCBcUtHSLXbN7tt4amrjYgbLYRl7NIfLQurlrDb31hhgpltXpETsJnIupPFAW7nhstEPDXtxV5XrEWh__M2a_flI1NVomjtgreuBHpcID1hXEY4DUFO0IBdj_8zdqAz_pCKLKRmPl7UXP90f9ynsy_JJw-k0KIhgLyCcGTFuruiY1yIPUnMMqT6KXPZP_midCAD_i7bOlT4eWUIhDLjAIaWNsVSDUqwDLprLkAe6KoekAJ0GoCUnNo3ARiOFmPLtoykWKwO99I_9UP2uhhQvU0cgq_moamKDECTSQcVp45YlutFM_lTXPURkKRoO3eicxlLF-27E60M--rBHT3-QXR7paQ';
  //token: any = null;

  data: any;

  constructor(
    private httpClient: HttpClient,
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
      .get(this.base_path + '/api/coupons/' + id, this.httpOptions)
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

  //Coupons (id: Company)
  addCoupon(id: number, item) {
    return this.httpClient
      .post(this.base_path + '/api/coupons/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Favorite
  addFavorite(customer_id: number, coupon_id: number) {
    return this.httpClient
      .post(this.base_path + '/api/favorit/' + customer_id + '/' + coupon_id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Devaluation
  addDevaluation(customer_id: number, coupon_id: number) {
    return this.httpClient
      .post(this.base_path + '/api/devaluation/' + customer_id + '/' + coupon_id, this.httpOptions)
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
  register(item) {

    return this.httpClient
      .post(this.base_path + '/registerUser', JSON.stringify(item))
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /* Login (POST)
   * --------------------------------------------------------
   */
  login(item) {

    return this.httpClient
      .post(this.base_path + '/api/login_check', JSON.stringify(item))
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

}