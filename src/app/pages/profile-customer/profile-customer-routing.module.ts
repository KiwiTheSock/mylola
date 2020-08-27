//Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Others
import { ProfileCustomerPage } from './profile-customer.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileCustomerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileCustomerPageRoutingModule {}
