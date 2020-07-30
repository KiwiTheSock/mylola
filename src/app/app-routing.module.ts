import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckTutorial } from './providers/check-tutorial.service';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tutorial',
    pathMatch: 'full'
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule),
    canActivate: [AuthGuard],
    data: {
      role: 'ADMIN'
    }
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignUpModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./pages/tabs-page/tabs-page.module').then(m => m.TabsModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then(m => m.TutorialModule),
    canLoad: [CheckTutorial]
  },
  {
    path: 'modal',
    loadChildren: () => import('./pages/modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'statistic',
    loadChildren: () => import('./pages/statistic/statistic.module').then( m => m.StatisticPageModule),
    canActivate: [AuthGuard],
    data: {
      role: 'ADMIN'
    }
  },
  {
    path: 'add',
    loadChildren: () => import('./pages/add/add.module').then( m => m.AddPageModule),
    canActivate: [AuthGuard],
    data: {
      role: 'ADMIN'
    }
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard],
    data: {
      role: 'USER'
    }
  }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
