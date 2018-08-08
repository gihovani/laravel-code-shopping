import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Select2Component} from "ng2-select2";
import {AbstractControl} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {Select2Service} from "../select2.service";

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

    constructor(public select2Service: Select2Service) {
    }

    ngOnInit() {
        const url = `${environment.api.url}/products`;
        this.select2Service.make(url, this.select2Element, this.productIdFormControl);
    }

}
