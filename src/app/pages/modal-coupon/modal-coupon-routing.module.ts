//Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Others
import { ModalCouponPage } from './modal-coupon.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCouponPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalCouponPageRoutingModule {}
