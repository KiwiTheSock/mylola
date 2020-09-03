import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HideHeaderDirective } from './hide-header.directive';
import { HasRoleDirective } from './has-role.directive';
import { TimePipe } from './time-pipe.directive';


@NgModule({
    declarations: [
        HasRoleDirective,
        HideHeaderDirective,
        TimePipe
    ],
    exports: [
        HideHeaderDirective, 
        HasRoleDirective,
        TimePipe
    ],
    imports: [
        CommonModule
    ]
})
export class SharedModule {}
