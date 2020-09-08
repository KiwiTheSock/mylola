//Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

//Ionic
import { Storage } from '@ionic/storage';

//Others
import { throwError, from, BehaviorSubject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

const TOKEN_KEY = 'jwt-token';
const USERNAME = 'username';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //API path
  private base_path = 'http://srv06-dev.mindq.kunden.openroot.de:8088';

  //Token
  private token = null;
  private httpOptions: any;

  //Username
  private username = null;

  constructor(
    private httpClient: HttpClient,
    private storage: Storage,
    private toastController: ToastController
  ) {
    this.getToken();
  }

  /* Get Token
   * --------------------------------------------------------
   */
  getToken() {

    //Username
    if (this.username == null) {
      this.storage.get(USERNAME).then(response => {
        this.username = response;
      });
    }

    //Token
    if (this.token == null) {
      this.storage.get(TOKEN_KEY).then(response => {
        this.token = response;
      })
    }

    //console.log("getToken() ", this.token);

    //HttpOptions
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryuL67FWkv1CA',//'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token
      }),
    }

    this.httpOptions["observe"] = 'response';

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

      console.error("Error as String: ", JSON.stringify(error));
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  /* GET
   * --------------------------------------------------------
   */
  get(path: string) {

    this.getToken();

    return this.httpClient
      .get(this.base_path + path, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /* GET (ID)
   * --------------------------------------------------------
   */
  getById(path: string, id: number) {

    this.getToken();

    return this.httpClient
      .get(this.base_path + path + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /* GET (ID, ID)
   * --------------------------------------------------------
   */
  getbyId(path: string, customer_id: number, coupon_id: number) {

    this.getToken();

    return this.httpClient
      .get(this.base_path + path + customer_id + '/' + coupon_id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /* POST
   * --------------------------------------------------------
   */
  post(path: string, id: number, item) {

    this.getToken();

    return this.httpClient
      .post(this.base_path + path + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /* PUT
   * --------------------------------------------------------
   */
  put(path: string, id: number, item) {

    this.getToken();

    return this.httpClient
      .put(this.base_path + path + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /* DELETE
   * --------------------------------------------------------
   */
  delete(path: string, id: number) {

    this.getToken();

    return this.httpClient
      .delete(this.base_path + path + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /* COMPANY
   * --------------------------------------------------------
   */

  //Params: path = '/api/companies'
  getCompanies() {

    this.getToken();

    return this.httpClient
      .get(this.base_path + '/api/companies', this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )

  }

  //Params: path = '/api/company/'
  getCompanyByIdentifier() {

    this.getToken();

    return this.httpClient
      .get(this.base_path + '/api/company/' + this.username, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Params: path = '/api/company/', id: number, item: array
  updateCompany(id: number, item) {

    this.getToken();

    return this.httpClient
      .put(this.base_path + '/api/company/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Params: path = '/api/company/', id: number
  deleteCompany(id: number) {

    this.getToken();

    return this.httpClient
      .delete(this.base_path + '/api/company/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /* COUPONS
   * --------------------------------------------------------
   */

  //Params: path = '/api/coupons'
  getCoupons() {

    this.getToken();

    return this.httpClient
      .get(this.base_path + '/api/coupons', this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Params: path = '/api/coupons/', id: any
  getCouponById(id: number) {

    this.getToken();

    return this.httpClient
      .get(this.base_path + '/api/coupons/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Params: path = '/api/coupons/', id: number, item: array
  addCoupon(company_id: number, item) {

    this.getToken();

    return this.httpClient
      .post(this.base_path + '/api/coupons/' + company_id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Params: path = '/api/coupons/', id: number, item: array
  updateCoupon(id: number, formData) {

    this.getToken();

    return this.httpClient
      .post(this.base_path + '/api/coupons/update/' + id, formData, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Params: path = '/api/coupons/', id: number
  deleteCoupon(id: number) {

    this.getToken();

    return this.httpClient
      .delete(this.base_path + '/api/coupons/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /* CUSTOMER
   * --------------------------------------------------------
   */

  //Params: path = '/api/customers'
  getCustomers() {

    this.getToken();

    return this.httpClient
      .get(this.base_path + '/api/customers', this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Params: path = '/api/customer/'
  getCustomerByIdentifier() {

    this.getToken();

    return this.httpClient
      .get(this.base_path + '/api/customer/' + this.username, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )

  }

  //Params: path = '/api/customer/', id: number, item: array
  updateCustomer(id: number, item) {

    this.getToken();

    return this.httpClient
      .put(this.base_path + '/api/customer/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Params: path = '/api/customer/', id: number
  deleteCustomer(id: number) {

    this.getToken();

    return this.httpClient
      .delete(this.base_path + '/api/customer/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /* DEVALUATION
   * --------------------------------------------------------
   */

  //Params: path = '/api/devaluations'
  getDevaluations() {

    this.getToken();

    return this.httpClient
      .get(this.base_path + '/api/devaluations', this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Params: path = /api/mydevaluations', id: number
  getDevaluationById(id: number) {

    this.getToken();

    return this.httpClient
      .get(this.base_path + '/api/mydevaluations/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Params: path = '/api/devaluations/setfavorit/', customer_id: number, coupon_id: number
  setFavorite(customer_id: number, coupon_id: number) {

    this.getToken();

    return this.httpClient
      .get(this.base_path + '/api/devaluations/setfavorit/' + customer_id + '/' + coupon_id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Params: path = '/api/devaluations/', id1: number, id2: number
  addDevaluation(customer_id: number, coupon_id: number) {

    this.getToken();

    return this.httpClient
      .post(this.base_path + '/api/devaluations/' + customer_id + '/' + coupon_id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /* HOURS
   * --------------------------------------------------------
   */

  //Params: path = '/api/hours/', id: number, item: array
  addHours(company_id: number, item) {

    this.getToken();

    return this.httpClient
      .post(this.base_path + '/api/hours/' + company_id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Params: path = /api/hours/', id: number, item: array
  updateHours(id: number, item) {

    this.getToken();

    return this.httpClient
      .put(this.base_path + '/api/hours/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /* SUBSCRIBER
   * --------------------------------------------------------
   */

  //Params: path = '/api/subscribe/', customer_id: number
  getMySubscribtions() {

    this.getToken();

    return this.httpClient
      .get(this.base_path + '/api/subscribe/' + this.username, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Params: path = '/api/subscribe/', company_id: number
  addSubscriber(company_id: number) {

    this.getToken();

    return this.httpClient
      .get(this.base_path + '/api/subscribe/' + this.username + '/' + company_id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Params: path = '/api/subscribe/',company_id: number
  deleteSubscriber(company_id: number) {

    this.getToken();

    return this.httpClient
      .delete(this.base_path + '/api/subscribe/' + this.username + '/' + company_id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /* URL
   * --------------------------------------------------------
   */

  //Params: path = '/api/url/', id: number, item: array
  addURL(company_id: number, item) {

    this.getToken();

    return this.httpClient
      .post(this.base_path + '/api/url' + company_id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Params: path = '/api/url', id: number, item: array
  updateURL(id: number, item) {

    this.getToken();

    return this.httpClient
      .put(this.base_path + '/api/url/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /* Register (POST)
   * --------------------------------------------------------
   */
  register(item) {

    this.getToken();

    return this.httpClient
      .post(this.base_path + '/registerUser', item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /* Login (POST)
   * --------------------------------------------------------
   */
  login(item) {

    this.storage.set(USERNAME, item.username);

    return this.httpClient
      .post(this.base_path + '/api/login_check', item)
      .pipe(
        retry(2),
        catchError(this.handleError),
      )
  }

  /* Logout
   * --------------------------------------------------------
   */
  logout() {
    this.storage.remove(USERNAME);
  }

  /* Images (POST)
   * --------------------------------------------------------
   */
  addImage(formData) {

    this.getToken();

    return this.httpClient
      .post(this.base_path + '/api/coupons/update/61', formData)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
}