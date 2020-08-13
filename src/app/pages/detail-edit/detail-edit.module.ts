import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailEditPageRoutingModule } from './detail-edit-routing.module';

import { DetailEditPage } from './detail-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailEditPageRoutingModule
  ],
  declarations: [DetailEditPage]
})
export class DetailEditPageModule {}
