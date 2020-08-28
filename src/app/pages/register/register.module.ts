//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Ionic
import { IonicModule } from '@ionic/angular';

//Others
import { RegisterPage } from './register';
import { RegisterPageRoutingModule } from './register-routing.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule
  ],
  declarations: [
    RegisterPage,
  ]
})
export class RegisterModule { }
