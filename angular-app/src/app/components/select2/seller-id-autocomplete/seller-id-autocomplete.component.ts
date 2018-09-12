import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {AbstractControl} from "@angular/forms";
import {Select2Component} from "ng2-select2";
import {Select2Service} from "../select2.service";
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'seller-id-autocomplete',
    templateUrl: './seller-id-autocomplete.component.html',
    styleUrls: ['./seller-id-autocomplete.component.css']
})
export class SellerIdAutocompleteComponent implements OnInit {
    @Input()
    public userIdFormControl: AbstractControl;
    @ViewChild(Select2Component, {read: ElementRef})
    select2Element: ElementRef;

    constructor(public select2Service: Select2Service) {
    }

    ngOnInit() {
        const url = `${environment.api.url}/users?role=seller`;
        this.select2Service.make(url, this.select2Element, this.userIdFormControl);
    }
}
