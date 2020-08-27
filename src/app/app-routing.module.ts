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
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule),
    canActivate: [AuthGuard],
    data: {
      role: 'ADMIN'
    }
  },
  {
    path: 'account-edit',
    loadChildren: () => import('./pages/account-edit/account-edit.module').then(m => m.AccountEditPageModule),
    canActivate: [AuthGuard],
    data: {
      role: 'ADMIN'
    }
  },
  {
    path: 'add',
    loadChildren: () => import('./pages/add/add.module').then(m => m.AddPageModule),
    canActivate: [AuthGuard],
    data: {
      role: 'ADMIN'
    }
  },
  //USER
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [AuthGuard],
    data: {
      role: 'USER'
    }
  },
  {
    path: 'profile-edit',
    loadChildren: () => import('./pages/profile-edit/profile-edit.module').then(m => m.ProfileEditPageModule),
    canActivate: [AuthGuard],
    data: {
      role: 'USER'
    }
  },
  {
    path: 'app',
    loadChildren: () => import('./pages/tabs-page/tabs-page.module').then(m => m.TabsModule)
  },
  {
    path: 'detail-edit',
    loadChildren: () => import('./pages/detail-edit/detail-edit.module').then(m => m.DetailEditPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./pages/modal/modal.module').then(m => m.ModalPageModule)
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
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignUpModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs-page/tabs-page.module').then(m => m.TabsModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then(m => m.TutorialModule),
    canLoad: [CheckTutorial]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
