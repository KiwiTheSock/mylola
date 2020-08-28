//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Ionic
import { IonicModule } from '@ionic/angular';

//Others
import { ProfileCompanyEditPageRoutingModule } from './profile-company-edit-routing.module';
import { ProfileCompanyEditPage } from './profile-company-edit.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProfileCompanyEditPageRoutingModule
  ],
  declarations: [ProfileCompanyEditPage]
})
export class ProfileCompanyEditPageModule {}
