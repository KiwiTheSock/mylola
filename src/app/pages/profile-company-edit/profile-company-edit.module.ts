//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Ionic
import { IonicModule } from '@ionic/angular';

//Others
import { ProfileCompanyEditPageRoutingModule } from './profile-company-edit-routing.module';
import { ProfileCompanyEditPage } from './profile-company-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProfileCompanyEditPageRoutingModule
  ],
  declarations: [ProfileCompanyEditPage]
})
export class ProfileCompanyEditPageModule {}
