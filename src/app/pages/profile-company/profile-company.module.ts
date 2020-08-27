//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Ionic
import { IonicModule } from '@ionic/angular';

//Others
import { ProfileCompanyPageRoutingModule } from './profile-company-routing.module';
import { ProfileCompanyPage } from './profile-company.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ProfileCompanyPageRoutingModule
  ],
  declarations: [
    ProfileCompanyPage,
  ]
})
export class ProfileCompanyPageModule { }
