import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs-page';
import { HomePage } from '../home/home';
import { FavoritesPage } from '../favorites/favorites';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'schedule',
        children: [
          {
            path: '',
            loadChildren: () => import('../home/home.module').then(m => m.HomeModule)
          },
          {
            path: 'detail/:sessionId',
            loadChildren: () => import('../detail/detail.module').then(m => m.DetailModule)
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
        redirectTo: '/app/tabs/schedule',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/app/tabs/schedule',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }

