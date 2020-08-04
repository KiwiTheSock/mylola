import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';

import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';

const TOKEN_KEY = 'user-access-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<any>;
  private authState = new BehaviorSubject(null);

  constructor(
    private storage: Storage,
    private router: Router
  ) {
    this.loadUser();
    this.user = this.authState.asObservable().pipe(
      filter(response => response)
    );
  }

  loadUser() {
    this.storage.get(TOKEN_KEY).then(data => {
      if (data) {
        this.authState.next(data);
      } else {
        this.authState.next({ email: null, role: null });
      }
    })
  }

  //Normally this should be a rest api call
  signIn(credentials) {
    let email = credentials.email;
    let pw = credentials.pw;
    let user = null;

    if (email === 'company' && pw === 'company') {
      user = { email, role: 'ADMIN' };
    } else if (email === 'user' && pw === 'user') {
      user = { email, role: 'USER' };
    }

    this.authState.next(user);

    this.storage.set(TOKEN_KEY, user);

    return of(user);
  }

  getUserSubject() {
    return this.authState.asObservable();
  }

  getRole(){
    return this.authState.value;
  }

  hasRoles(roles: string): boolean {

    for (const oneRole of roles) {
      if (!this.authState.value || !(this.authState.value.role.includes(oneRole))) {
        return false;
      }
    }
    return true;
  }

  logout() {
    this.authState.next(null);
    this.storage.clear();
  }
}
