import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HideHeaderDirective } from './hide-header.directive';
import { HasRoleDirective } from './has-role.directive';

@NgModule({
    declarations: [
        HasRoleDirective,
        HideHeaderDirective
    ],
    exports: [
        HideHeaderDirective, 
        HasRoleDirective
    ],
    imports: [
        CommonModule
    ]
})
export class SharedModule {}
