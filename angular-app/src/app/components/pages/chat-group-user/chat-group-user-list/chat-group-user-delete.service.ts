import {Injectable} from "@angular/core";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ChatGroupUserListComponent} from "./chat-group-user-list.component";

@Injectable({
    providedIn: 'root'
})
export class ChatGroupUserDeleteService {
    private _listComponent: ChatGroupUserListComponent;

    constructor(private notifyMessage: NotifyMessageService) {
    }

    set listComponent(value: ChatGroupUserListComponent) {
        this._listComponent = value;
    }

    showModal(chatGroupId: number, userId: number) {
        this._listComponent.chatGroupId = chatGroupId;
        this._listComponent.userId = userId;
        this._listComponent.deleteModal.showModal();
    }

    onError($event) {
        this.notifyMessage.error('Não foi possível remover este membro');
        console.log($event);
    }

    onSuccess($event) {
        this.notifyMessage.success('Membro removido com sucesso!');
        this._listComponent.getItems();
    }
}