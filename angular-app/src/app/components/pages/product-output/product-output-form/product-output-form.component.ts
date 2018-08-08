import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import productOutputFieldsOptions from "./product-output-fields-options";

@Component({
    selector: 'product-output-form',
    templateUrl: './product-output-form.component.html',
    styleUrls: ['./product-output-form.component.css']
})
export class ProductOutputFormComponent implements OnInit {

    @Input()
    public form: FormGroup;

    constructor() {
    }

    ngOnInit() {
    }

    get fieldsOptions() {
        return productOutputFieldsOptions;
    }

    get product_id() {
        return this.fieldsOptions.product_id;
    }

    get amount() {
        return this.fieldsOptions.amount;
    }
}
