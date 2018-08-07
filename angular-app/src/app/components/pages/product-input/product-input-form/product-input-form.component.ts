import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";
import productInputFieldsOptions from "./product-input-fields-options";
import {ProductIdFieldService} from "./product-id-field.service";
import {Select2Component} from "ng2-select2";


@Component({
    selector: 'product-input-form',
    templateUrl: './product-input-form.component.html',
    styleUrls: ['./product-input-form.component.css']
})
export class ProductInputFormComponent implements OnInit {

    @Input()
    public form: FormGroup;

    @ViewChild(Select2Component, {read: ElementRef})
    select2Element: ElementRef;

    constructor(public productIdField: ProductIdFieldService) {
    }

    ngOnInit() {
        this.productIdField.make(this.select2Element, this.form.get('product_id'));
    }

    get fieldsOptions() {
        return productInputFieldsOptions;
    }

    get product_id() {
        return this.fieldsOptions.product_id;
    }

    get amount() {
        return this.fieldsOptions.amount;
    }

}
