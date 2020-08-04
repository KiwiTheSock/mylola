import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalLogoutPageRoutingModule } from './modal-logout-routing.module';

import { ModalLogoutPage } from './modal-logout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalLogoutPageRoutingModule
  ],
  declarations: [ModalLogoutPage]
})
export class ModalLogoutPageModule {}
