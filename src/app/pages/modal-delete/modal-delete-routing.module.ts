import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalDeletePage } from './modal-delete.page';

const routes: Routes = [
  {
    path: '',
    component: ModalDeletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalDeletePageRoutingModule {}
