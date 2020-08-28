//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Ionic
import { IonicModule } from '@ionic/angular';

//Others
import { DetailEditPageRoutingModule } from './detail-edit-routing.module';
import { DetailEditPage } from './detail-edit.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DetailEditPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DetailEditPage]
})
export class DetailEditPageModule {}
