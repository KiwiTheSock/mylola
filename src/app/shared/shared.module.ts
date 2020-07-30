import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HideHeaderDirective } from '../directives/hide-header.directive';
import { HasRoleDirective } from '../directives/has-role.directive';


@NgModule({
    declarations: [HideHeaderDirective, HasRoleDirective],
    exports: [HideHeaderDirective, HasRoleDirective],
    imports: [
        CommonModule
    ]
})
export class SharedModule {}
