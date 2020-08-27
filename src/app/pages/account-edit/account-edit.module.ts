//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Ionic
import { IonicModule } from '@ionic/angular';

//Others
import { AccountEditPageRoutingModule } from './account-edit-routing.module';
import { AccountEditPage } from './account-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AccountEditPageRoutingModule
  ],
  declarations: [AccountEditPage]
})
export class AccountEditPageModule {}
