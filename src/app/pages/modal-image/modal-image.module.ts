//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Ionic
import { IonicModule } from '@ionic/angular';

//Others
import { ModalImagePageRoutingModule } from './modal-image-routing.module';
import { ModalImagePage } from './modal-image.page';
import { ImageCropperModule } from "ngx-image-cropper";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalImagePageRoutingModule,
    ImageCropperModule
  ],
  declarations: [ModalImagePage]
})
export class ModalImagePageModule {}
