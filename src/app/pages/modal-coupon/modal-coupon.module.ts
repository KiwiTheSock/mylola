//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Ionic
import { IonicModule } from '@ionic/angular';

//Others
import { ModalCouponPageRoutingModule } from './modal-coupon-routing.module';
import { ModalCouponPage } from './modal-coupon.page';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { NgxBarcode6Module } from 'ngx-barcode6';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalCouponPageRoutingModule,
    NgxQRCodeModule,
    NgxBarcode6Module
  ],
  declarations: [ModalCouponPage]
})
export class ModalCouponPageModule {}
