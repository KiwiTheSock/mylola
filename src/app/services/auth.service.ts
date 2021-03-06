import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, from } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { ApiService } from './api.service';
import { take, map, switchMap } from 'rxjs/operators';

const helper = new JwtHelperService();
const TOKEN_KEY = 'jwt-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //User
  public user: Observable<any>;
  private userData = new BehaviorSubject(null);

  //Data
  data: any;

  constructor(
    private apiService: ApiService,
    private storage: Storage,
    private router: Router
  ) {
    this.loadUser();
    this.user = this.userData.asObservable().pipe(
      filter(response => response)
    );
  }

  /* Loading Users
   * --------------------------------------------------------
   */
  loadUser() {
    this.storage.get(TOKEN_KEY).then(data => {
      if (data) {
        let decoded = helper.decodeToken(data);
        this.userData.next(decoded);
      } else {
        this.userData.next({ email: null, role: null });
      }
    })
  }

  /* Login
   * --------------------------------------------------------
   */
  login(login) {

    return this.apiService.login(login)
    .pipe(
      take(1),
      map(res => {
        return res;
      }),
      switchMap((token: string) => {

        let token_stringify = JSON.stringify(token);
        let t = token_stringify.split("\"");
        let decoded = helper.decodeToken(t[3]);

        this.userData.next(decoded);
        let storageObs = from(this.storage.set(TOKEN_KEY, t[3]));
        return storageObs;
      })
    )
  }

  /* Register
   * --------------------------------------------------------
   */
  register(register) {
    return this.apiService.register(register);
  }

  /* Logout
   * --------------------------------------------------------
   */
  logout() {
    this.apiService.logout();
    this.storage.remove(TOKEN_KEY).then(() => {
      this.userData.next(null);
      this.storage.clear();
    });
  }

  /* Get User Subject
   * --------------------------------------------------------
   */
  getUserSubject() {
    return this.userData.asObservable();
  }

  /* Get Role
   * --------------------------------------------------------
   */
  getRole() {
    return this.userData.value.roles;
  }

  /* Has Role
   * --------------------------------------------------------
   */
  hasRoles(roles: string): boolean {

    if (this.userData.value != null) {
      for (const oneRole of roles) {
        if (!this.userData.value.roles || !(this.userData.value.roles.includes(oneRole))) {
          return false;
        }
      }
      return true;
    }
  }

}