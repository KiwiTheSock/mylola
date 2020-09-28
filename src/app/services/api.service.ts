//Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

//Ionic
import { Storage } from '@ionic/storage';

//Others
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

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
  private httpOptionsImages: any;

  //Username
  private username = null;

  constructor(
    private httpClient: HttpClient,
    private storage: Storage,
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

    //console.log(this.username);

    //Token
    if (this.token == null) {
      this.storage.get(TOKEN_KEY).then(response => {
        this.token = response;
      })
    }

    //console.log(this.token);

    //HttpOptions
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token
      }),
    }

    //HttpOptions
    this.httpOptionsImages = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryuL67FWkv1CA',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token
      }),
    }

    this.httpOptions["observe"] = 'response';
    this.httpOptionsImages["observe"] = 'response';

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
  getCompany() {

    this.getToken();

    return this.httpClient
      .get(this.base_path + '/api/company/' + this.username, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Params: path = '/api/company/mycoupons'
  getCompanyCoupons() {

    this.getToken();

    return this.httpClient
      .get(this.base_path + '/api/company/mycoupons/' + this.username, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }


  //Params: path = '/api/company/',  item: array
  updateCompany(item) {

    this.getToken();

    return this.httpClient
      .put(this.base_path + '/api/company/' + this.username, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Params: path = '/api/coupons/updatebanner/', formData: any
  updateCompanyBanner(formData: any) {

    this.getToken();

    return this.httpClient
      .post(this.base_path + '/api/updatebanner/' + this.username, formData)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Params: path = '/api/coupons/updatelogo/', formData: any
  updateCompanyLogo(formData: any) {

    this.getToken();

    return this.httpClient
      .post(this.base_path + '/api/updatelogo/' + this.username, formData)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Params: path = '/api/company/', identifier: any
  deleteCompany(identifier: any) {

    this.getToken();

    return this.httpClient
      .delete(this.base_path + '/api/company/' + identifier, this.httpOptions)
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

    if (this.username == null) {
      return this.httpClient
        .get(this.base_path + '/api/coupons', this.httpOptions)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    } else {
      return this.httpClient
        .get(this.base_path + '/api/coupons', this.httpOptions)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }
  }

  //Params: path = '/api/coupons/', id: number
  getCouponById(id: number) {

    this.getToken();

    return this.httpClient
      .get(this.base_path + '/api/coupons/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Params: path = '/api/coupons/', item: any
  addCoupon(item: any) {

    this.getToken();

    return this.httpClient
      .post(this.base_path + '/api/coupons/' + this.username, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Params: path = '/api/coupons/update/', id: number, item: any
  updateCoupon(id: number, item: any) {

    this.getToken();

    return this.httpClient
      .post(this.base_path + '/api/coupons/update/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Params: path = '/api/coupons/update/banner/', identifier: any, formData: any
  updateCouponBanner(identifier: any, formData: any) {

    this.getToken();

    return this.httpClient
      .post(this.base_path + '/api/coupons/update/banner/' + identifier, formData)
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

  //Params: path = '/api/customer/', item: any
  updateCustomer(item: any) {

    this.getToken();

    return this.httpClient
      .put(this.base_path + '/api/customer/' + this.username, JSON.stringify(item), this.httpOptions)
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
  getDevaluationByIdentifier() {

    this.getToken();

    return this.httpClient
      .get(this.base_path + '/api/mydevaluations/' + this.username, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Params: path = '/api/myfavorits/'
  getFavorite() {

    this.getToken();

    return this.httpClient
      .get(this.base_path + '/api/myfavorits/' + this.username, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Params: path = '/api/devaluations/setfavorit/',  coupon_id: number
  setFavorite(coupon_id: number) {

    this.getToken();

    return this.httpClient
      .get(this.base_path + '/api/devaluations/setfavorit/' + this.username + '/' + coupon_id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Params: path = '/api/devaluations/defavorit/', coupon_id: number
  deFavorite(coupon_id: number) {

    this.getToken();

    return this.httpClient
      .get(this.base_path + '/api/devaluations/defavorit/' + this.username + '/' + coupon_id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Params: path = '/api/devaluations/', coupon_id: number
  addDevaluation(coupon_id: number) {

    this.getToken();

    return this.httpClient
      .get(this.base_path + '/api/devaluations/' + this.username + '/' + coupon_id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /* HOURS
   * --------------------------------------------------------
   */

  //Params: path = '/api/hours/', company_id: number, item: any
  addHours(company_id: number, item: any) {

    this.getToken();

    return this.httpClient
      .post(this.base_path + '/api/hours/' + company_id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Params: path = /api/hours/', item: any
  updateHours(item: any) {

    this.getToken();

    return this.httpClient
      .put(this.base_path + '/api/hours/' + this.username, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /* SUBSCRIBER
   * --------------------------------------------------------
   */

  //Params: path = '/api/subscribe/'
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

  //Params: path = '/api/subscribe/', company_id: number
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

  //Params: path = '/api/url/', id: number, item: any
  addURL(company_id: number, item: any) {

    this.getToken();

    return this.httpClient
      .post(this.base_path + '/api/url/' + company_id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Params: path = '/api/url/', item: any
  updateURL(item: any) {

    this.getToken();

    return this.httpClient
      .put(this.base_path + '/api/url/' + this.username, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /* Register (POST)
   * --------------------------------------------------------
   */
  register(item: any) {

    this.getToken();

    return this.httpClient
      .post(this.base_path + '/registerUser', item)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /* Login (POST)
   * --------------------------------------------------------
   */
  login(item: any) {

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
    this.username = null;
    this.token = null;
  }

  /* Search (GET)
   * --------------------------------------------------------
   */
  search(title: any) {

    this.getToken();

    return this.httpClient
      .get(this.base_path + '/api/coupon/search/title/' + title, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /* Filter Category (POST)
  * --------------------------------------------------------
  */
  filterByCategory(categories: any) {

    this.getToken();

    let data = {
      "categories": categories
    }

    return this.httpClient
      .post(this.base_path + '/api/coupon/search/category', JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )

  }

  /* Filter Ending (POST)
   * --------------------------------------------------------
   */
  filterByEnding() {

    this.getToken();

    return this.httpClient
      .get(this.base_path + '/api/coupon/search/nextending', this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )

  }

  /* Filter NearBy (POST)
   * --------------------------------------------------------
   */
  filterByNearBy(latitude: any, longitude: any) {

    this.getToken();

    let data = {
      "lat": latitude,
      "lng": longitude
    }

    return this.httpClient
      .post(this.base_path + '/api/coupon/search/byposition', JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )

  }
}