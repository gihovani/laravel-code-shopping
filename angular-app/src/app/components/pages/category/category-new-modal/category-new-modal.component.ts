import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ModalComponent} from '../../../bootstrap/modal/modal.component';
import {CategoryHttpService} from "../../../../services/http/category-http.service";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import fieldsOptions from '../category-form/category-fields-options';

@Component({
    selector: 'category-new-modal',
    templateUrl: './category-new-modal.component.html',
    styleUrls: ['./category-new-modal.component.css']
})
export class CategoryNewModalComponent implements OnInit {
    public form: FormGroup;
    public errors: {};

    @ViewChild(ModalComponent)
    public modal: ModalComponent;

    @Output()
    public onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output()
    public onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    constructor(private categoryHttp: CategoryHttpService, private formBuilder: FormBuilder) {
        const maxLength = fieldsOptions.name.validationMessage.maxlength;
        this.form = this.formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(maxLength)]],
            active: false
        });
    }

    ngOnInit() {
    }


    submit() {
        this.categoryHttp.create(this.form.value).subscribe(category => {
            this.form.reset({
                name: '',
                active: false
            });
            this.modal.hide();
            this.onSuccess.emit(category);
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
