import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalLogoutPage } from './modal-logout.page';

const routes: Routes = [
  {
    path: '',
    component: ModalLogoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalLogoutPageRoutingModule {}
