import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {ProductHttpService} from "../../../../services/http/product-http.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import productFieldsOptions from "../product-form/product-fields-options";

@Component({
    selector: 'product-new-modal',
    templateUrl: './product-new-modal.component.html',
    styleUrls: ['./product-new-modal.component.css']
})
export class ProductNewModalComponent implements OnInit {
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
        const minPrice = productFieldsOptions.name.validationMessage.min;
        this.form = this.formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(maxLength)]],
            price: ['', [Validators.required, Validators.min(minPrice)]],
            description: '',
            active: false
        });
    }

    ngOnInit() {
    }


    submit() {
        this.productHttp.create(this.form.value).subscribe(product => {
            this.modal.hide();
            this.onSuccess.emit(product);
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
