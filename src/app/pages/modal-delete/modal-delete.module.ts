//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Ionic
import { IonicModule } from '@ionic/angular';

//Others
import { ModalDeletePageRoutingModule } from './modal-delete-routing.module';
import { ModalDeletePage } from './modal-delete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalDeletePageRoutingModule
  ],
  declarations: [ModalDeletePage]
})
export class ModalDeletePageModule {}
