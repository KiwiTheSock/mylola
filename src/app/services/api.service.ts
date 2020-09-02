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
  token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1OTkwNzE5OTQsImV4cCI6MTU5OTA3NTU5NCwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiS2V2aW4ifQ.HsUJrI_fhyVj5bbGauoXCG3XzZKWHScYBL8F5ALSnEBcBN8piQpBr405gxGevSBoilT1giov6fVaNkGcyHS7sW0fzswgeZ33OlC5slsuBuNSSLwnR1gxgfCq_siBkWdbEn_ZTT81KOfjwwawEmGHmSnMi3fR5YkdpHmuTYZTD0h2iScmYFWZE08ZFQ1sFTegK2bBwcFW4C5v4IvhTEYGTk-9OLoHZ41tTEvRC20dbuu18RSrN_McDI4HbsH-26dhXVmFwMiin3sW4wiWfGjBp_gHKB6969XNSaY55dnQns-NH7_RzyvmkfMgOblwyfrjr4SdPGfMPH-5NK4S_vUJ8v6Eko0fzpM-sqxy6YqVBo7tcvT__v4uJwNwqB8xU34q2ubKNBVH--_GgPAmlWflnP1ZeNvCxKFVPqC9H5BnrqFZlV3PQLpTN8yyV-yLVsI9T6ZOsjxf-7-mCMbSAcDI9rMcJALXf_DM-H3Mdao6dKCiDLreM7xhzbG7e8zUWkm4JGu6Ou1MCRuSsmWN_0qecKx6TortrPF_9WpPWNuTaEyFL1Ee2KGEz7YWb81pIv3-aRPXbvWsLZY2HIeIKGOsnz-oaNUDpfZLizFdmtboQY3_ZRd9sc8nYUksa33hQHq93nmcGKx8EyUbMY5HJFMCS2k6NKohVPdBOn5MRQBkIVY';
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