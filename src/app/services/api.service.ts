//Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

//Ionic
import { Storage } from '@ionic/storage';

//Others
import { throwError, from, BehaviorSubject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //API path
  base_path = 'http://srv06-dev.mindq.kunden.openroot.de:8088';

  //Token
  token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1OTg5OTMyOTgsImV4cCI6MTU5ODk5Njg5OCwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiS2V2aW4ifQ.Sq3QEJXhoD55N7V69nxSG4iJmNx1Ry6P5lT1XQzIDLS04a99FOo96_9hfUyLmnQs5xRc1fwYGBiQO5-_Xb_lrrR5ruGBEetOhMZDk_BVjN7Zghf2WDiOk5spGq5UIRH7pM_P747hlY86DAM6eV6ur6Ue9XQwPbPUNzlflOrNyiDUpzAfUK8FVe0SzAitfDm4oi8EraqcszoPhRMauVvqPl_YXhkaTI-PG4n4w5S2dpJaGIguves14ELh9riZEA64hGkpqgptCszmiqXJnP3xnma6KcL7Tbdu7sXnaACsJgrS8f_c9TuFELSuD2jMwoLM_I5xp0m5pfAOH3mycl0TCCKkJPLIGr-Iw1Cj_ua_t6hQ0tFvrFMATfbc1SWnVgEgP8IHzaDCnzn_gT_L_ufYVrCErpA3O-BUTwB9jOQmU_6W1gkjBGK7EU-Rm6zVJNvY41pu_cM4GHpKNEg_aqMYYkR7rTME3BE9N3x3idsi8BkFm15g2CPrD2N-Uak8sGPcWFRiRpWyIGTzn4Er3cgn0DMMqPZFB8SZqDsQHm5OjyHy0eBmovVd3SZ1JoBww1dzEJKsMUxUcsZRV42i4Xx5h-XDVYNKlaMdzk4mFjhSsYpBitfkhF1Z-aNrwVaeGmQPd91jApa0o1ELmQ6Iy1aSHNF6L_PsXSb6KzBMdKp_S_g';
  //token: any;

  constructor(
    private httpClient: HttpClient,
    private storage: Storage,
  ) { }

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

      //console.error("Error as String: ", JSON.stringify(error));
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  /* GET
   * --------------------------------------------------------
   */

  get(path: string) {
    return this.httpClient
      .get(this.base_path + path, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }


  //Companies
  //Params: path = '/api/companies'
  getCompanies() {
    return this.httpClient
      .get(this.base_path + '/api/companies', this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Coupons
  //Params: path = '/api/coupons'
  getCoupons() {
    return this.httpClient
      .get(this.base_path + '/api/coupons', this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  //Customer
  //Params: path = '/api/customers'
  getCustomers() {
    return this.httpClient
      .get(this.base_path + '/api/customers', this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Devaluations
  //Params: path = '/api/devaluations'
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

  getById(path: string, id: number) {
    return this.httpClient
      .get(this.base_path + path + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Companies
  //Params: path = '/api/company/', id: number
  getCompanyById(id: number) {
    return this.httpClient
      .get(this.base_path + '/api/company/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Coupons
  //Params: path = '/api/coupons/', id: number
  getCouponById(id: number) {
    return this.httpClient
      .get(this.base_path + '/api/coupons/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Customer
  //Params: path = '/api/customer/', id: number
  getCustomerById(id: number) {
    return this.httpClient
      .get(this.base_path + '/api/customer/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Devaluations
  //Params: path = /api/mydevaluations', id: number
  getDevaluationById(id: number) {
    return this.httpClient
      .get(this.base_path + '/api/mydevaluations/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /* GET (ID, ID)
   * --------------------------------------------------------
   */
  getbyId(path: string, customer_id: number, coupon_id: number) {
    return this.httpClient
      .get(this.base_path + path + customer_id + '/' + coupon_id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }


  //Favorite
  //Params: path = '/api/favorit/', customer_id: number, coupon_id: number
  addFavorite(customer_id: number, coupon_id: number) {
    return this.httpClient
      .get(this.base_path + '/api/favorit/' + customer_id + '/' + coupon_id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Devaluation 
  //Params: path = '/api/devaluations/', id1: number, id2: number
  addDevaluation(customer_id: number, coupon_id: number) {
    return this.httpClient
      .get(this.base_path + '/api/devaluations/' + customer_id + '/' + coupon_id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /* POST
   * --------------------------------------------------------
   */

  post(path: string, id: number, item) {
    return this.httpClient
      .post(this.base_path + path + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }


  //Coupons
  //Params: path = '/api/coupons/', id: number, item: array
  addCoupon(company_id: number, item) {
    return this.httpClient
      .post(this.base_path + '/api/coupons/' + company_id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Hours 
  //Params: path = '/api/hours/', id: number, item: array
  addHours(company_id: number, item) {
    return this.httpClient
      .post(this.base_path + '/api/hours/' + company_id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //URL
  //Params: path = '/api/url/', id: number, item: array
  addURL(company_id: number, item) {
    return this.httpClient
      .post(this.base_path + '/api/url' + company_id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /* PUT
   * --------------------------------------------------------
   */
  put(path: string, id: number, item) {
    return this.httpClient
      .put(this.base_path + path + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Company
  //Params: path = '/api/company/', id: number, item: array
  updateCompany(id: number, item) {
    return this.httpClient
      .put(this.base_path + '/api/company/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Coupons
  //Params: path = '/api/coupons/', id: number, item: array
  updateCoupon(id: number, item) {
    return this.httpClient
      .put(this.base_path + '/api/coupons/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Customer
  //Params: path = '/api/customer/', id: number, item: array
  updateCustomer(id: number, item) {
    return this.httpClient
      .put(this.base_path + '/api/customer/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Hours
  //Params: path = /api/hours/', id: number, item: array
  updateHours(id: number, item) {
    return this.httpClient
      .put(this.base_path + '/api/hours/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //URL
  //Params: path = '/api/url', id: number, item: array
  updateURL(id: number, item) {
    return this.httpClient
      .put(this.base_path + '/api/url' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /* DELETE
   * --------------------------------------------------------
   */
  delete(path: string, id: number) {
    return this.httpClient
      .delete(this.base_path + path + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Company
  //Params: path = '/api/company/', id: number
  deleteCompany(id: number) {
    return this.httpClient
      .delete(this.base_path + '/api/company/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Coupons
  //Params: path = '/api/coupons/', id: number
  deleteCoupon(id: number) {
    return this.httpClient
      .delete(this.base_path + '/api/coupons/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Coupons
  //Params: path = '/api/customer/', id: number
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
      .post(this.base_path + '/registerUser', item)
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
      .post(this.base_path + '/api/login_check', item)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  apiToken(item) {
    this.login(item).subscribe((token: string) => {
      let token_stringify = JSON.stringify(token);
      let t = token_stringify.split("\"");
      this.token ="'" + t[3] + "'";
    })
  }
}