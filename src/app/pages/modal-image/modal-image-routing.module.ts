//Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Others
import { ModalImagePage } from './modal-image.page';

const routes: Routes = [
  {
    path: '',
    component: ModalImagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalImagePageRoutingModule {}
