import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {ChatGroupLinkInvitationHttpService} from "../../../../services/http/chat-group-link-invitation-http.service";
import {ChatGroupLinkInvitation} from "../../../../model";

@Component({
    selector: 'chat-group-link-inv-delete-modal',
    templateUrl: './chat-group-link-inv-delete-modal.component.html',
    styleUrls: ['./chat-group-link-inv-delete-modal.component.css']
})
export class ChatGroupLinkInvDeleteModalComponent implements OnInit {
    public errors = {};

    public chatGroupLinkInv: ChatGroupLinkInvitation;
    private _chatGroupId: number;
    private _invitationId: number;

    @ViewChild(ModalComponent)
    modal: ModalComponent;

    @Output()
    public onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output()
    public onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    constructor(private linkInvHttp: ChatGroupLinkInvitationHttpService) {
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
            this.chatGroupLinkInv = chatGroupLinkInv;
        }, responseError => {
            if (responseError.status === 401) {
                this.modal.hide();
            }
        });
    }

    submit() {
        this.linkInvHttp.destroy(this._chatGroupId, this._invitationId).subscribe(chatGroupLinkInv => {
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
