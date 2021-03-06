//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Ionic
import { IonicModule } from '@ionic/angular';

//Others
import { ProfileCustomerPageRoutingModule } from './profile-customer-routing.module';
import { ProfileCustomerPage } from './profile-customer.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    ProfileCustomerPageRoutingModule
  ],
  declarations: [ProfileCustomerPage]
})
export class ProfileCustomerPageModule {}
