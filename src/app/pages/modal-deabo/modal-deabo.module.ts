//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Ionic
import { IonicModule } from '@ionic/angular';

//Others
import { ModalDeaboPageRoutingModule } from './modal-deabo-routing.module';
import { ModalDeaboPage } from './modal-deabo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalDeaboPageRoutingModule
  ],
  declarations: [ModalDeaboPage]
})
export class ModalDeaboPageModule {}
