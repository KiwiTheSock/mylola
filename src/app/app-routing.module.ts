//Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Others
import { CheckTutorial } from './services/check-tutorial.service';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tutorial',
    pathMatch: 'full'
  },
  //ADMIN
  {
    path: 'profile-company',
    loadChildren: () => import('./pages/profile-company/profile-company.module').then(m => m.ProfileCompanyPageModule), 
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_COMPANY'
    }
  },
  {
    path: 'profile-company-edit',
    loadChildren: () => import('./pages/profile-company-edit/profile-company-edit.module').then(m => m.ProfileCompanyEditPageModule),
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_COMPANY'
    }
  },
  {
    path: 'add',
    loadChildren: () => import('./pages/add/add.module').then(m => m.AddPageModule),
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_COMPANY'
    }
  },
  //USER
  {
    path: 'profile-customer',
    loadChildren: () => import('./pages/profile-customer/profile-customer.module').then(m => m.ProfileCustomerPageModule),
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_USER'
    }
  },
  {
    path: 'profile-customer-edit',
    loadChildren: () => import('./pages/profile-customer-edit/profile-customer-edit.module').then(m => m.ProfileEditPageModule),
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_USER'
    }
  },
  {
    path: 'app',
    loadChildren: () => import('./pages/tabs-page/tabs-page.module').then(m => m.TabsModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'modal-coupon',
    loadChildren: () => import('./pages/modal-coupon/modal-coupon.module').then(m => m.ModalCouponPageModule)
  },
  {
    path: 'modal-logout',
    loadChildren: () => import('./pages/modal-logout/modal-logout.module').then(m => m.ModalLogoutPageModule)
  },
  {
    path: 'modal-image',
    loadChildren: () => import('./pages/modal-image/modal-image.module').then(m => m.ModalImagePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs-page/tabs-page.module').then(m => m.TabsModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then(m => m.TutorialModule),
    canLoad: [CheckTutorial]
  },
  {
    path: 'modal-delete',
    loadChildren: () => import('./pages/modal-delete/modal-delete.module').then( m => m.ModalDeletePageModule)
  },
  {
    path: 'modal-deabo',
    loadChildren: () => import('./pages/modal-deabo/modal-deabo.module').then( m => m.ModalDeaboPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
