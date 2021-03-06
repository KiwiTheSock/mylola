//Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Others
import { EventsPage } from './events';

const routes: Routes = [
  {
    path: '',
    component: EventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsPageRoutingModule { }
