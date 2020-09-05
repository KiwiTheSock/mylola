//Angular
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

//Ionic
import { AlertController } from '@ionic/angular';

//Others
import { AuthService } from '../services/auth.service';
import { take, map } from 'rxjs/operators';

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
          let role = user.roles;
          if(expectedRole == role) {
            return true;
          } else {
            this.showAlert();
            if (role == 'ROLE_USER' || role == 'ROLE_ADMIN') {
              return this.router.parseUrl('/app/tabs/home');
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
      header: 'Unauthorisiert!',
      message: 'Es ist Ihnen nicht erlaubt diese Seite zu besuchen!',
      buttons: ['OK']
    });
    alert.present();
  }

}
