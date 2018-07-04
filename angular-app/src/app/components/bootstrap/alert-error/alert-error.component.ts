import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'alert-error',
    templateUrl: './alert-error.component.html',
    styleUrls: ['./alert-error.component.css']
})
export class AlertErrorComponent implements OnInit {

    @Output()
    public showChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    public _show: boolean = false;

    constructor() {
    }

    ngOnInit() {
    }

    @Input()
    set show(value) {
        this.showChange.emit(value);
        this._show = value;
    }

    hide() {
        this.show = false;
    }

}
