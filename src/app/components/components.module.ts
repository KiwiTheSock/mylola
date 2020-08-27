//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Ionic
import { IonicModule } from '@ionic/angular';

//Others
import { HeaderMenuComponent } from './header-menu/header-menu.component'

@NgModule({
  declarations: [
    HeaderMenuComponent
  ],
  exports: [
    HeaderMenuComponent
  ],
  imports: [
    CommonModule, 
    FormsModule, 
    IonicModule
  ]
})
export class ComponentsModule { }
