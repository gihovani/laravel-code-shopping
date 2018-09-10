import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ChatGroup} from "../../../../model";
import {HttpErrorResponse} from "@angular/common/http";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {ChatGroupHttpService} from "../../../../services/http/chat-group-http.service";

@Component({
    selector: 'chat-group-delete-modal',
    templateUrl: './chat-group-delete-modal.component.html',
    styleUrls: ['./chat-group-delete-modal.component.css']
})
export class ChatGroupDeleteModalComponent implements OnInit {
    private _chatGroupId: number;
    public chatGroup: ChatGroup = null;
    public errors = {};

    @Output()
    public onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output()
    public onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    @ViewChild(ModalComponent)
    modal: ModalComponent;

    constructor(private chatGroupHttp: ChatGroupHttpService) {
    }

    ngOnInit() {

    }

    @Input()
    set chatGroupId(value) {
        if (!value) return;

        this._chatGroupId = value;
        this.chatGroupHttp.get(value).subscribe(response => {
            this.chatGroup = response;
        });
    }

    destroy() {
        this.chatGroupHttp.destroy(this._chatGroupId).subscribe(chatGroup => {
            this.modal.hide();
            this.onSuccess.emit(chatGroup);
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
