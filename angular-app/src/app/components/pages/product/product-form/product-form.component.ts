import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import productFieldsOptions from "./product-fields-options";

@Component({
    selector: 'product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
    @Input()
    public form: FormGroup;

    constructor(private changeRef: ChangeDetectorRef) {
    }

    ngOnInit() {
    }

    ngOnChanges() {
        this.changeRef.detectChanges();
    }

    get fieldsOptions() {
        return productFieldsOptions;
    }

    get name() {
        return this.fieldsOptions.name;
    }

    get price() {
        return this.fieldsOptions.price;
    }

    get description() {
        return this.fieldsOptions.description;
    }

}
