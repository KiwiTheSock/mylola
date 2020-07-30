import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private auth: AuthService,
    private alertCtrl: AlertController
  ) { }

  canActivate(route: ActivatedRouteSnapshot) {
    
    const expectedRole = route.data.role;

    return this.auth.user.pipe(
      take(1),
      map(user => {
        if (user){
          let role = user['role'];

          if(expectedRole == role) {
            return true;
          } else {
            this.showAlert();
            if (role == 'USER') {
              return this.router.parseUrl('/app/tabs/schedule');
            } else if (role == 'ADMIN'){
              return this.router.parseUrl('/app/tabs/schedule');
            } else {
              return this.router.parseUrl('/login');
            }
          }
        } else {
          this.showAlert();
          return this.router.parseUrl('/login');
        }
      })
    )
  }

  async showAlert() {
    let alert = await this.alertCtrl.create({
      header: 'Unauthorized',
      message: 'You are not authorized to visit that page!',
      buttons: ['OK']
    });
    alert.present();
  }
  
}
