//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Ionic
import { IonicModule } from '@ionic/angular';

//Others
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { HeaderBackComponent } from './header-back/header-back.component';

@NgModule({
  declarations: [
    HeaderBackComponent,
    HeaderMenuComponent,
  ],
  exports: [
    HeaderBackComponent,
    HeaderMenuComponent,
  ],
  imports: [
    CommonModule, 
    FormsModule, 
    IonicModule
  ]
})
export class ComponentsModule { }
