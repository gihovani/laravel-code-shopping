import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import categoryFieldsOptions from './category-fields-options';

@Component({
    selector: 'category-form',
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

    @Input()
    public form: FormGroup;

    constructor() {
    }

    ngOnInit() {
    }

    get fieldsOptions() {
        return categoryFieldsOptions;
    }

    get name() {
        return this.fieldsOptions.name;
    }
}
