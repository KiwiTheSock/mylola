//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

//Ionic
import { IonicModule } from '@ionic/angular';

//Others
import { AddPageRoutingModule } from './add-routing.module';
import { AddPage } from './add.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddPageRoutingModule
  ],
  declarations: [AddPage]
})
export class AddPageModule {}
