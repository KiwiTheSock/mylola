import { Directive, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { DomController, Platform } from '@ionic/angular';

@Directive({
    selector: '[appHideHeader]'
})
export class HideHeaderDirective implements OnInit {

    @Input('header') header: any;

    private lastY = 0;
    private transition;

    constructor(
        private renderer: Renderer2,
        private domCtrl: DomController,
        private platform: Platform
    ) {
        if (this.platform.platforms().includes("ios")) {
            this.transition = '0ms';
        }
        else {
            this.transition = '700ms';
        }
    }

    ngOnInit(): void {
        this.header = this.header.el;
        this.domCtrl.write(() => {
            this.renderer.setStyle(this.header, 'webkitTransition', 'margin-top ' + this.transition);
        });
    }

    @HostListener('ionScroll', ['$event']) onContentScroll($event: any) {

        if ($event.detail.scrollTop > this.header.clientHeight) {
            this.domCtrl.write(() => {
                this.renderer.setStyle(this.header, 'margin-top', `-${this.header.clientHeight}px`);
            });
        } else {
            this.domCtrl.write(() => {
                this.renderer.setStyle(this.header, 'margin-top', '0');
            });
        }
        this.lastY = $event.detail.scrollTop;
    }

}






