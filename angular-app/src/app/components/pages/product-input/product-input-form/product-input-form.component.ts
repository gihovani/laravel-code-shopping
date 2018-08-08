import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";
import productInputFieldsOptions from "./product-input-fields-options";
import {Select2Service} from "../../../select2/select2.service";
import {Select2Component} from "ng2-select2";


@Component({
    selector: 'product-input-form',
    templateUrl: './product-input-form.component.html',
    styleUrls: ['./product-input-form.component.css']
})
export class ProductInputFormComponent implements OnInit {

    @Input()
    public form: FormGroup;

    constructor() {
    }

    ngOnInit() {
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
