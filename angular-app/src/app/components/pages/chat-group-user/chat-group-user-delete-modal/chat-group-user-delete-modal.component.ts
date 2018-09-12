import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ChatGroup, User} from "../../../../model";
import {HttpErrorResponse} from "@angular/common/http";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {UserHttpService} from "../../../../services/http/user-http.service";
import {ChatGroupHttpService} from "../../../../services/http/chat-group-http.service";
import {ChatGroupUserHttpService} from "../../../../services/http/chat-group-user-http.service";

@Component({
    selector: 'chat-group-user-delete-modal',
    templateUrl: './chat-group-user-delete-modal.component.html',
    styleUrls: ['./chat-group-user-delete-modal.component.css']
})
export class ChatGroupUserDeleteModalComponent implements OnInit {
    private _userId: number;
    private _chatGroupId: number;
    public user: User = null;
    public chatGroup: ChatGroup = null;

    @Output()
    public onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output()
    public onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    @ViewChild(ModalComponent)
    modal: ModalComponent;

    constructor(private userHttp: UserHttpService,
                private chatGroupHttp: ChatGroupHttpService,
                private chatGroupUserHttp: ChatGroupUserHttpService) {
    }

    ngOnInit() {

    }

    @Input()
    set userId(value) {
        if (!value) return;

        this._userId = value;
        this.userHttp.get(value).subscribe(response => {
            this.user = response;
        });
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
        this.chatGroupUserHttp.destroy(this._chatGroupId, this._userId)
            .subscribe(response => {
                this.modal.hide();
                this.onSuccess.emit(response);
            }, error => this.onError.emit(error));
    }

    showModal() {
        this.modal.show();
    }

    hideModal($event: Event) {
        console.log($event);
    }
}
