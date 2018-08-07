import {Directive, ElementRef, Input} from '@angular/core';
import {NgControl} from '@angular/forms';

function toogleClassIsInvalid(control: NgControl, nativeElement: HTMLElement) {
    control.valueChanges.subscribe(() => {
        if (control.errors && (control.dirty || control.touched)) {
            if (!nativeElement.classList.contains('is-invalid')) {
                nativeElement.classList.add('is-invalid');
            }
        } else {
            nativeElement.classList.remove('is-invalid');
        }
    });

}

@Directive({
    selector: '[isInvalid]'
})
export class IsInvalidDirective {

    constructor(private element: ElementRef, private control: NgControl) {
    }

    ngOnInit() {
        toogleClassIsInvalid(this.control, this.element.nativeElement);
    }
}

@Directive({
    selector: '[isInvalidControl]'
})
export class isInvalidControlDirective {
    private control: NgControl;

    constructor(private element: ElementRef) {
    }

    @Input()
    set isInvalidControl(value) {
        this.control = value;
    }

    ngOnInit() {
        toogleClassIsInvalid(this.control, this.element.nativeElement);
    }
}
