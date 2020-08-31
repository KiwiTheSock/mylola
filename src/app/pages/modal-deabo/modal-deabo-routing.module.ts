import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalDeaboPage } from './modal-deabo.page';

const routes: Routes = [
  {
    path: '',
    component: ModalDeaboPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalDeaboPageRoutingModule {}
