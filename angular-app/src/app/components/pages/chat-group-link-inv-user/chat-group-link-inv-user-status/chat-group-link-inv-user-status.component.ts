import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChatGroupLinkInvitationUser, ChatGroupLinkInvitationUserStatus} from "../../../../model";
import {ChatGroupLinkInvitationUserHttpService} from "../../../../services/http/chat-group-link-invitation-user-http.service";
import {NotifyMessageService} from "../../../../services/notify-message.service";

@Component({
    selector: 'chat-group-link-inv-user-status',
    templateUrl: './chat-group-link-inv-user-status.component.html',
    styleUrls: ['./chat-group-link-inv-user-status.component.css']
})
export class ChatGroupLinkInvUserStatusComponent implements OnInit {
    @Input()
    groupId: number;
    @Input()
    userInvitation: ChatGroupLinkInvitationUser;

    @Output()
    onSuccess: EventEmitter<any> = new EventEmitter<any>();

    constructor(private userInvHttp: ChatGroupLinkInvitationUserHttpService,
                private notifyMessage: NotifyMessageService) {
    }

    ngOnInit() {
    }

    approve() {
        this.update(ChatGroupLinkInvitationUserStatus.APPROVE);
    }

    reprove() {
        this.update(ChatGroupLinkInvitationUserStatus.REPROVE);
    }

    update(status: ChatGroupLinkInvitationUserStatus) {
        this.userInvHttp.update(this.groupId, this.userInvitation.id, status).subscribe(response => {
            this.onSuccess.emit(status);
            this.notifyMessage.success('Alteração feita com sucesso!');
        });
    }
}
