import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductInputHttpService} from "../../../../services/http/product-input-http.service";

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
        this.form = this.formBuilder.group({
            product_id: 0,
            amount: 0
        });
    }

    ngOnInit() {
    }

    submit() {
        this.productInputHttp.create(this.form.value).subscribe(productInput => {
            this.modal.hide();
            this.onSuccess.emit(productInput);
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
