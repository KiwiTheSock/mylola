//Angular
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgModule } from '@angular/core';

//Ionic
import { IonicModule } from '@ionic/angular';

//Others
import { AddPageRoutingModule } from './add-routing.module';
import { AddPage } from './add.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    AddPageRoutingModule,
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  declarations: [AddPage]
})
export class AddPageModule {}
