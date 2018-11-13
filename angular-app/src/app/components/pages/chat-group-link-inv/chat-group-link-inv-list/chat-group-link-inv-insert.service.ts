import {Injectable} from "@angular/core";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ChatGroupLinkInvListComponent} from "./chat-group-link-inv-list.component";

@Injectable({
    providedIn: 'root'
})
export class ChatGroupLinkInvInsertService {
    private _listComponent: ChatGroupLinkInvListComponent;

    constructor(private notifyMessage: NotifyMessageService) {
    }

    set listComponent(value: ChatGroupLinkInvListComponent) {
        this._listComponent = value;
    }

    showModal() {
        this._listComponent.newModal.showModal();
    }

    onError($event) {
        this.notifyMessage.error('Não foi possível criar este Convite');
        console.log($event);
    }

    onSuccess($event) {
        this.notifyMessage.success('Convite criado com sucesso!');
        this._listComponent.getItems();
    }
}