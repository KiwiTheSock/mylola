//Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Others
import { ProfileCustomerEditPage } from './profile-customer-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileCustomerEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileCustomerEditPageRoutingModule {}
