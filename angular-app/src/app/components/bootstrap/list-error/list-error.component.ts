import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'list-error',
    templateUrl: './list-error.component.html',
    styleUrls: ['./list-error.component.css']
})
export class ListErrorComponent implements OnInit {

    @Input()
    public errors = {};

    constructor() {
    }

    ngOnInit() {
    }

    get errorsKeys() {
        return (this.errors) ? Object.keys(this.errors) : [];
    }

    showErrors() {
        return this.errorsKeys.length > 0;
    }
}
