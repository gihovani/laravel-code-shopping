import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {ChatGroupHttpService} from "../../../../services/http/chat-group-http.service";
import chatGroupFieldsOptions from "../chat-group-form/chat-group-fields-options";

@Component({
    selector: 'chat-group-new-modal',
    templateUrl: './chat-group-new-modal.component.html',
    styleUrls: ['./chat-group-new-modal.component.css']
})
export class ChatGroupNewModalComponent implements OnInit {
    public form: FormGroup;
    public errors = {};

    @Output()
    public onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output()
    public onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    @ViewChild(ModalComponent)
    modal: ModalComponent;

    constructor(private chatGroupHttp: ChatGroupHttpService,
                private formBuilder: FormBuilder) {
        const maxLength = chatGroupFieldsOptions.name.validationMessage.maxlength;
        this.form = this.formBuilder.group({
            id: 0,
            name: ['', [Validators.required, Validators.maxLength(maxLength)]],
            photo: [null, [Validators.required]]
        });
    }

    ngOnInit() {
    }

    submit() {
        this.chatGroupHttp.create(this.form.value).subscribe(chatGroup => {
            this.modal.hide();
            this.onSuccess.emit(chatGroup);
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
        this.form.get('photo').setValue(null);
        this.modal.show();
    }

    hideModal($event: Event) {
        console.log($event);
    }
}
