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

  public user: Observable<any>;
  private userData = new BehaviorSubject(null);

  //API
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

  //API Call
  login(login) {

    this.apiService.apiToken(login);

    return this.apiService.login(login).pipe(
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

  //API Call
  register(register) {
    return this.apiService.register(register);
  }

  getUserSubject() {
    return this.userData.asObservable();
  }

  getRole() {
    return this.userData.value.roles;
  }

  hasRoles(roles: string): boolean {
    if (this.userData.value) {
      for (const oneRole of roles) {
        if (!this.userData.value.roles || !(this.userData.value.roles.includes(oneRole))) {
          return false;
        }
      }
    }
    return true;
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.userData.next(null);
      this.storage.clear();
    });
  }

}