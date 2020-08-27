//Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Others
import { DetailEditPage } from './detail-edit.page';

const routes: Routes = [
  {
    path: '',
    component: DetailEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailEditPageRoutingModule {}
