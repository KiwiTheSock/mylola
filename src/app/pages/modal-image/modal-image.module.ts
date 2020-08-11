import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

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
