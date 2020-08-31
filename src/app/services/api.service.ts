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
  token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1OTg5MDEwODAsImV4cCI6MTU5ODkwNDY4MCwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiS2V2aW4ifQ.Y6vCoy05czKlwcA395Y1zKGj2VToJdr9kzCqiFC0jkkhd9dnf4e4MsR2U-EnXMjicVS35FmRFTI9gcMTVW7_c7ahBugf3gYxrcYvk2kHyDAd6NYSzgnXtL_K5qQMw0RdYsUahAx-7V8mz6AuFh9E_rRAq60bddh3DsbWD0cOf8Jl2U9nKLzg-RUqddQLUBmVjSxvhGQyVXHJlaGvn6chZQWvhljeDJ8RTlFkUkjR60hvqvkDB1oZE2IGLY9uZjwocPSmJuwVHUeqoTf5wF7XwChnzGfxAqNQl249eVbaV1uosJxqi-QbDy4iKgkQHSe8VOr3xz8U6l32AaKO2hVm89b_5Mzsrj61plzt32bIOoXcw7Ry7jNxukKKOfw5Gh8lZFTrqnU7FduT9SxVHZ_hCgDUbFWf_N8BLYC-8fDiOYdsLs9TZkDUbGfXKkNSEwvtccVN-gwG-KYq1gGivwYgfEfAdo5VAH4IV4uHcCMJd2zRZAp7TgCWLhizDgHOmTEH8rZu93WnByU6O8zlEgfBX27vgalZPJQKCpxFg5rYN4N31UFy5w-XPYf00JJwwob2cTXpDjj7KsdQ9NPt3QfPCpd2los7L3EIyL1nyEFUs6ovtxOcwBqCksXvXFloSU4nYoxll5SbkZmDozeOmBEsTpdBRul5S8ov4Gq0atyk9Vs';
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

      console.error("Error as String: ", JSON.stringify(error));
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
      );
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

  /* GET (ID, ID)
   * --------------------------------------------------------
   */

  //Favorite
  addFavorite(customer_id: number, coupon_id: number) {
    return this.httpClient
      .get(this.base_path + '/api/favorit/' + customer_id + '/' + coupon_id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Devaluation 
  addDevaluation(coupon_id: number, customer_id:number) {
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

  //Coupons
  addCoupon(company_id: number, item) {
    return this.httpClient
      .post(this.base_path + '/api/coupons/' + company_id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Hours 
  addHours(company_id: number, item) {
    return this.httpClient
      .post(this.base_path + '/api/' + company_id + '/hours', JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //URL
  addURL(company_id: number, item) {
    return this.httpClient
      .post(this.base_path + '/api/' + company_id + '/url', JSON.stringify(item), this.httpOptions)
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
      .put(this.base_path + '/api/' + id + '/hours', JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //URL
  updateURL(id: number, item) {
    return this.httpClient
      .put(this.base_path + '/api/' + id + '/url', JSON.stringify(item), this.httpOptions)
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
      .post(this.base_path + '/api/login_check', item)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

}