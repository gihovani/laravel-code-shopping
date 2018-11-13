import {Injectable} from "@angular/core";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ChatGroupLinkInvListComponent} from "./chat-group-link-inv-list.component";

@Injectable({
    providedIn: 'root'
})
export class ChatGroupLinkInvDeleteService {
    private _listComponent: ChatGroupLinkInvListComponent;

    constructor(private notifyMessage: NotifyMessageService) {
    }

    set listComponent(value: ChatGroupLinkInvListComponent) {
        this._listComponent = value;
    }

    showModal(invitationId: number) {
        this._listComponent.invitationId = invitationId;
        this._listComponent.deleteModal.showModal();
    }

    onError($event) {
        this.notifyMessage.error('Não foi possível remover este Convite');
        console.log($event);
    }

    onSuccess($event) {
        this.notifyMessage.success('Convite apagado com sucesso!');
        this._listComponent.getItems();
    }
}