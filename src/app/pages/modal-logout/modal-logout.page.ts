import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { UserData } from '../../services/user-data';
import { Router } from '@angular/router';

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
      return this.router.navigateByUrl('/app/tabs/schedule');
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
