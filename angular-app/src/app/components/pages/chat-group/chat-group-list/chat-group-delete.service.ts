import {Injectable} from "@angular/core";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ChatGroupListComponent} from "./chat-group-list.component";

@Injectable({
    providedIn: 'root'
})
export class ChatGroupDeleteService {
    private _listComponent: ChatGroupListComponent;

    constructor(private notifyMessage: NotifyMessageService) {
    }

    set listComponent(value: ChatGroupListComponent) {
        this._listComponent = value;
    }

    showModal(chatGroupId: number) {
        this._listComponent.chatGroupId = chatGroupId;
        this._listComponent.deleteModal.showModal();
    }

    onError($event) {
        this.notifyMessage.error('Não foi possível remover este Grupo');
        console.log($event);
    }

    onSuccess($event) {
        this.notifyMessage.success('Grupo apagado com sucesso!');
        this._listComponent.getItems();
    }
}