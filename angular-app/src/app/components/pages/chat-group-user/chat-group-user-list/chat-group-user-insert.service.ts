import {Injectable} from "@angular/core";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ChatGroupUserListComponent} from "./chat-group-user-list.component";

@Injectable({
    providedIn: 'root'
})
export class ChatGroupUserInsertService {
    private _listComponent: ChatGroupUserListComponent;

    constructor(private notifyMessage: NotifyMessageService) {
    }

    set listComponent(value: ChatGroupUserListComponent) {
        this._listComponent = value;
    }

    onError($event) {
        this.notifyMessage.error('Não foi possível adicionar os novos membros neste grupo!');
        console.log($event);
    }

    onSuccess($event) {
        this.notifyMessage.success('Membros adicionados com sucesso!');
        this._listComponent.getItems();
    }
}