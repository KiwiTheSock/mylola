//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Ionic
import { IonicModule } from '@ionic/angular';

//Others
import { ProfileCustomerEditPageRoutingModule } from './profile-customer-edit-routing.module';
import { ProfileCustomerEditPage } from './profile-customer-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileCustomerEditPageRoutingModule
  ],
  declarations: [ProfileCustomerEditPage]
})
export class ProfileEditPageModule {}
