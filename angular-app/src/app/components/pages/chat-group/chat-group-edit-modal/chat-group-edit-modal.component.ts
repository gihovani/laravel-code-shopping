import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {ChatGroupHttpService} from "../../../../services/http/chat-group-http.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import chatGroupFieldsOptions from "../chat-group-form/chat-group-fields-options";
import {ChatGroup} from "../../../../model";

@Component({
    selector: 'chat-group-edit-modal',
    templateUrl: './chat-group-edit-modal.component.html',
    styleUrls: ['./chat-group-edit-modal.component.css']
})
export class ChatGroupEditModalComponent implements OnInit {
    private _chatGroupId: number;
    public chatGroup: ChatGroup;
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
            photo: null
        });
    }

    ngOnInit() {

    }

    @Input()
    set chatGroupId(value) {
        if (!value) return;

        this._chatGroupId = value;
        this.chatGroupHttp.get(value).subscribe(response => {
            this.form.patchValue(response);
            this.chatGroup = response;
        });
    }

    submit() {
        this.chatGroupHttp.update(this._chatGroupId, this.form.value).subscribe(chatGroup => {
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
