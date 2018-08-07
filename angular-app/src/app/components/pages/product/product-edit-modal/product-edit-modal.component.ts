import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {ProductHttpService} from "../../../../services/http/product-http.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import productFieldsOptions from "../product-form/product-fields-options";

@Component({
    selector: 'product-edit-modal',
    templateUrl: './product-edit-modal.component.html',
    styleUrls: ['./product-edit-modal.component.css']
})
export class ProductEditModalComponent implements OnInit {
    private _productId: number;
    public form: FormGroup;
    public errors: {};

    @ViewChild(ModalComponent)
    public modal: ModalComponent;

    @Output()
    public onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output()
    public onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    constructor(private productHttp: ProductHttpService, private formBuilder: FormBuilder) {
        const maxLength = productFieldsOptions.name.validationMessage.maxlength;
        const minPrice = productFieldsOptions.price.validationMessage.min;
        this.form = this.formBuilder.group({
            id: 0,
            name: ['', [Validators.required, Validators.maxLength(maxLength)]],
            price: ['', [Validators.required, Validators.min(minPrice)]],
            description: '',
            active: false
        });
    }

    ngOnInit() {
    }

    @Input()
    set productId(value) {
        if (!value) return;

        this.form.reset();
        this._productId = value;
        this.productHttp.get(value).subscribe(response => {
            this.form.patchValue(response);
        });
    }

    submit() {
        this.productHttp.update(this._productId, this.form.value).subscribe((product) => {
            this.modal.hide();
            this.onSuccess.emit(product);
            this.form.reset();
            this.errors = {};
        }, responseError => {
            if (responseError.status === 422) {
                this.errors = responseError.error.errors;
            }
            this.onError.emit(responseError);
        });
    }

    showModal() {
        this.modal.show();
    }

    hideModal($event: Event) {
        console.log($event);
    }
}
