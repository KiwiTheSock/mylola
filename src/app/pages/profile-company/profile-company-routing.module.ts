//Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Others
import { ProfileCompanyPage } from './profile-company.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileCompanyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileCompanyPageRoutingModule { }
