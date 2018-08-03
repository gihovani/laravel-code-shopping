import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {UserHttpService} from "../../../../services/http/user-http.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import userFieldsOptions from "./user-fields-options";

@Component({
    selector: 'user-new-modal',
    templateUrl: './user-new-modal.component.html',
    styleUrls: ['./user-new-modal.component.css']
})
export class UserNewModalComponent implements OnInit {
    public form: FormGroup;
    public errors: {};

    @ViewChild(ModalComponent)
    public modal: ModalComponent;

    @Output()
    public onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output()
    public onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    constructor(private userHttp: UserHttpService, private formBuilder: FormBuilder) {
        const maxLength = userFieldsOptions.name.validationMessage.maxLength;
        const minLength = userFieldsOptions.password.validationMessage.maxLength;
        this.form = this.formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(maxLength)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(minLength)]]
        });
    }

    ngOnInit() {
    }

    submit() {
        this.userHttp.create(this.form.value).subscribe(user => {
            this.modal.hide();
            this.onSuccess.emit(user);
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
