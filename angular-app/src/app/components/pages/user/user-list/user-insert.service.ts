import {Injectable} from "@angular/core";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {UserListComponent} from "./user-list.component";

@Injectable({
    providedIn: 'root'
})
export class UserInsertService {
    private _listComponent: UserListComponent;

    constructor(private notifyMessage: NotifyMessageService) {
    }

    set listComponent(value: UserListComponent) {
        this._listComponent = value;
    }

    showModal() {
        this._listComponent.newModal.showModal();
    }

    onError($event) {
        this.notifyMessage.error('Não foi possível criar este Usuário');
        console.log($event);
    }

    onSuccess($event) {
        this.notifyMessage.success('Usuário criado com sucesso!');
        this._listComponent.getItems();
    }
}