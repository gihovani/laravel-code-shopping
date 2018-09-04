import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {UserHttpService} from "../../../../services/http/user-http.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import userFieldsOptions from "../user-new-modal/user-fields-options";

@Component({
  selector: 'user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.css']
})
export class UserEditModalComponent implements OnInit {
    private _userId:number;
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
            id: 0,
            name: ['', [Validators.required, Validators.maxLength(maxLength)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(minLength)]]
        });
    }

    ngOnInit() {
    }

    @Input()
    set userId(value) {
        if (!value) return;

        this.form.reset();
        this._userId = value;
        this.userHttp.get(value).subscribe(response => {
            this.form.patchValue(response);
        });
    }

    submit() {
        this.userHttp.update(this._userId, this.form.value).subscribe((user) => {
            this.modal.hide();
            this.onSuccess.emit(user);
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
