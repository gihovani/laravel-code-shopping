import {Injectable} from "@angular/core";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {UserListComponent} from "./user-list.component";

@Injectable({
    providedIn: 'root'
})
export class UserDeleteService {
    private _listComponent: UserListComponent;

    constructor(private notifyMessage: NotifyMessageService) { }

    set listComponent(value: UserListComponent) {
        this._listComponent = value;
    }

    showModal(userId: number) {
        this._listComponent.userId = userId;
        this._listComponent.deleteModal.showModal();
    }

    onError($event) {
        this.notifyMessage.error('Não foi possível remover este Usuário');
        console.log($event);
    }

    onSuccess($event) {
        this.notifyMessage.success('Usuário apagado com sucesso!');
        this._listComponent.getItems();
    }
}