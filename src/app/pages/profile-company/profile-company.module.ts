//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Ionic
import { IonicModule } from '@ionic/angular';

//Others
import { ProfileCompanyPageRoutingModule } from './profile-company-routing.module';
import { ProfileCompanyPage } from './profile-company.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    IonicModule,
    ProfileCompanyPageRoutingModule
  ],
  declarations: [
    ProfileCompanyPage,
  ]
})
export class ProfileCompanyPageModule { }
