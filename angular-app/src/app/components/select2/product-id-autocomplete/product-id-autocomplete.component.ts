import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Select2Component} from "ng2-select2";
import {ProductIdFieldService} from "./product-id-field.service";
import {AbstractControl} from "@angular/forms";

@Component({
    selector: 'product-id-autocomplete',
    templateUrl: './product-id-autocomplete.component.html',
    styleUrls: ['./product-id-autocomplete.component.css']
})
export class ProductIdAutocompleteComponent implements OnInit {
    @Input()
    public productIdFormControl: AbstractControl;
    @ViewChild(Select2Component, {read: ElementRef})
    select2Element: ElementRef;

    constructor(public productIdField: ProductIdFieldService) {
    }

    ngOnInit() {
        this.productIdField.make(this.select2Element, this.productIdFormControl);
    }

}
