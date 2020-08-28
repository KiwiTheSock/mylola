//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Ionic
import { IonicModule } from '@ionic/angular';

//Others
import { CouponComponent } from './coupon/coupon.component';
import { FilterComponent } from './filter/filter.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { HeaderBackComponent } from './header-back/header-back.component';
import { HeaderSearchComponent } from './header-search/header-search.component';

@NgModule({
  declarations: [
    CouponComponent,
    FilterComponent,
    HeaderBackComponent,
    HeaderMenuComponent,
    HeaderSearchComponent,
  ],
  exports: [
    CouponComponent,
    FilterComponent,
    HeaderBackComponent,
    HeaderMenuComponent,
    HeaderSearchComponent,
  ],
  imports: [
    CommonModule, 
    FormsModule, 
    IonicModule
  ]
})
export class ComponentsModule { }
