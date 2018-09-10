import {Injectable} from "@angular/core";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ChatGroupListComponent} from "./chat-group-list.component";

@Injectable({
    providedIn: 'root'
})
export class ChatGroupEditService {
    private _listComponent: ChatGroupListComponent;

    constructor(private notifyMessage: NotifyMessageService) {
    }

    set listComponent(value: ChatGroupListComponent) {
        this._listComponent = value;
    }

    showModal(chatGroupId: number) {
        this._listComponent.chatGroupId = chatGroupId;
        this._listComponent.editModal.showModal();
    }

    onError($event) {
        this.notifyMessage.error('Não foi possível atualizar os dados deste Grupo');
        console.log($event);
    }

    onSuccess($event) {
        this.notifyMessage.success('Grupo alterado com sucesso!');
        this._listComponent.getItems();
    }
}