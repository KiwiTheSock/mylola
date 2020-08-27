//Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Others
import { ProfileCompanyEditPage } from './profile-company-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileCompanyEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileCompanyEditPageRoutingModule {}
