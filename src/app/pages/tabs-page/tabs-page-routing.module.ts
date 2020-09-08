//Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Others
import { TabsPage } from './tabs-page';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('../home/home.module').then(m => m.HomeModule)
          },
          {
            path: 'detail/:sessionId',
            children: [
              {
                path: '',
                loadChildren: () => import('../detail/detail.module').then(m => m.DetailModule)
              },
              {
                path: 'detail-edit',
                loadChildren: () => import('../detail-edit/detail-edit.module').then(m => m.DetailEditPageModule),
                canActivate: [AuthGuard],
                data: {
                  role: 'ROLE_COMPANY'
                }
              }
            ]
          }
        ]
      },
      {
        path: 'favorites',
        children: [
          {
            path: '',
            loadChildren: () => import('../favorites/favorites.module').then(m => m.FavoritesModule)
          },
          {
            path: 'detail/:sessionId',
            loadChildren: () => import('../detail/detail.module').then(m => m.DetailModule)
          }
        ]
      },
      {
        path: 'events',
        children: [
          {
            path: '',
            loadChildren: () => import('../events/events.module').then(m => m.EventsModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/app/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/app/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }

