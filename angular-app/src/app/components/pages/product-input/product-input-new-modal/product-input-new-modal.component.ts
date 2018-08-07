import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductInputHttpService} from "../../../../services/http/product-input-http.service";
import productInputFieldsOptions from "../product-input-form/product-input-fields-options";

@Component({
    selector: 'product-input-new-modal',
    templateUrl: './product-input-new-modal.component.html',
    styleUrls: ['./product-input-new-modal.component.css']
})
export class ProductInputNewModalComponent implements OnInit {
    public form: FormGroup;
    public errors: {};

    @ViewChild(ModalComponent)
    public modal: ModalComponent;

    @Output()
    public onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output()
    public onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    constructor(private productInputHttp: ProductInputHttpService, private formBuilder: FormBuilder) {
        const min = productInputFieldsOptions.amount.validationMessage.min;
        this.form = this.formBuilder.group({
            product_id: [null, [Validators.required]],
            amount: [null, [Validators.required, Validators.min(min)]]
        });
    }

    ngOnInit() {
    }

    submit() {
        this.productInputHttp.create(this.form.value).subscribe(productInput => {
            this.modal.hide();
            this.onSuccess.emit(productInput);
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
