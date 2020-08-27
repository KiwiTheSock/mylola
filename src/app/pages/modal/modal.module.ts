//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Ionic
import { IonicModule } from '@ionic/angular';

//Others
import { ModalPageRoutingModule } from './modal-routing.module';
import { ModalPage } from './modal.page';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { NgxBarcode6Module } from 'ngx-barcode6';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPageRoutingModule,
    NgxQRCodeModule,
    NgxBarcode6Module
  ],
  declarations: [ModalPage]
})
export class ModalPageModule {}
