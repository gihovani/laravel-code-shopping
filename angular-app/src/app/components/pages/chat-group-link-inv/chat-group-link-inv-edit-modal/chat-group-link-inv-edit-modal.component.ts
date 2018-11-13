import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {ChatGroupLinkInvitationHttpService} from "../../../../services/http/chat-group-link-invitation-http.service";
import chatGroupLinkInvFieldsOptions from "../chat-group-link-inv-form/chat-group-link-inv-fields-options";

@Component({
    selector: 'chat-group-link-inv-edit-modal',
    templateUrl: './chat-group-link-inv-edit-modal.component.html',
    styleUrls: ['./chat-group-link-inv-edit-modal.component.css']
})
export class ChatGroupLinkInvEditModalComponent implements OnInit {

    public form: FormGroup;
    public errors = {};

    private _chatGroupId: number;
    private _invitationId: number;

    @ViewChild(ModalComponent)
    modal: ModalComponent;

    @Output()
    public onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output()
    public onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    constructor(public linkInvHttp: ChatGroupLinkInvitationHttpService,
                private formBuilder: FormBuilder) {
        const min = chatGroupLinkInvFieldsOptions.total.validationMessage.min;
        this.form = this.formBuilder.group({
            total: [min, [Validators.required, Validators.min(min)]],
            expires_at: null,
            remaining: null
        });
    }

    ngOnInit() {
    }

    @Input()
    set invitationId(value) {
        this._invitationId = value;
        this.getItem();
    }

    @Input()
    set chatGroupId(value) {
        this._chatGroupId = value;
        this.getItem();
    }

    getItem() {
        if (!(this._invitationId && this._chatGroupId)) {
            return;
        }

        this.linkInvHttp.get(this._chatGroupId, this._invitationId).subscribe(chatGroupLinkInv => {
            chatGroupLinkInv.expires_at = (chatGroupLinkInv.expires_at) ? chatGroupLinkInv.expires_at.substring(0, 10) : null;
            this.form.patchValue(chatGroupLinkInv);
        }, responseError => {
            if (responseError.status === 401) {
                this.modal.hide();
            }
        });
    }

    submit() {
        this.linkInvHttp.update(this._chatGroupId, this._invitationId, this.form.value).subscribe(chatGroupLinkInv => {
            this.form.reset({
                total: chatGroupLinkInvFieldsOptions.total.validationMessage.min,
                expires_at: null,
                remaining: null
            });
            this.errors = {};
            this.onSuccess.emit(chatGroupLinkInv);
            this.modal.hide();
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
