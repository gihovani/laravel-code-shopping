import {Injectable} from "@angular/core";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ChatGroupListComponent} from "./chat-group-list.component";


@Injectable({
    providedIn: 'root'
})
export class ChatGroupInsertService {
    private _listComponent: ChatGroupListComponent;

    constructor(private notifyMessage: NotifyMessageService) {
    }

    set listComponent(value: ChatGroupListComponent) {
        this._listComponent = value;
    }

    showModal() {
        this._listComponent.newModal.showModal();
    }
    onError($event) {
        this.notifyMessage.error('Não foi possível criar este Grupo');
        console.log($event);
    }

    onSuccess($event) {
        this.notifyMessage.success('Grupo criado com sucesso!');
        this._listComponent.getItems();
    }
}