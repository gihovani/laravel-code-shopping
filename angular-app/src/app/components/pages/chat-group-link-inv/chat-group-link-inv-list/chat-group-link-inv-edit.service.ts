import {Injectable} from "@angular/core";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ChatGroupLinkInvListComponent} from "./chat-group-link-inv-list.component";

@Injectable({
    providedIn: 'root'
})
export class ChatGroupLinkInvEditService {
    private _listComponent: ChatGroupLinkInvListComponent;

    constructor(private notifyMessage: NotifyMessageService) {
    }

    set listComponent(value: ChatGroupLinkInvListComponent) {
        this._listComponent = value;
    }

    showModal(invitationId: number) {
        this._listComponent.invitationId = invitationId;
        this._listComponent.editModal.showModal();
    }

    onError($event) {
        this.notifyMessage.error('Não foi possível atualizar os dados deste Convite');
        console.log($event);
    }

    onSuccess($event) {
        this.notifyMessage.success('Convite alterado com sucesso!');
        this._listComponent.getItems();
    }
}