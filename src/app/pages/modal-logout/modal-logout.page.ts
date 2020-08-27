//Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';

//Ionic
import { ModalController } from '@ionic/angular';

//Others
import { AuthService } from '../../services/auth.service';
import { UserData } from '../../services/user-data';

@Component({
  selector: 'app-modal-logout',
  templateUrl: './modal-logout.page.html',
  styleUrls: ['./modal-logout.page.scss'],
})
export class ModalLogoutPage{

  constructor(
    public modalCtrl : ModalController,
    private authService: AuthService,
    private userData: UserData,
    private router: Router,
  ) { }

  logout() {
    this.modalCtrl.dismiss({'dismissed': true});

    this.authService.logout();
    this.userData.logout().then(() => {
      return this.router.navigateByUrl('/app/tabs/home');
    });
    
  } 

  // Data passed in by componentProps
  //@Input() users: string;
  dismiss() {
    this.modalCtrl.dismiss({'dismissed': true});
  }

  // can "dismiss" itself and optionally pass back data
  /*
  selectUser(user: string):void {
    this.modalCtrl.dismiss(user);
  }
  */

}
