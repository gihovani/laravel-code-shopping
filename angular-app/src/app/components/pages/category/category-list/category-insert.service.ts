import {Injectable} from "@angular/core";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {CategoryListComponent} from "./category-list.component";

@Injectable({
    providedIn: 'root'
})
export class CategoryInsertService {
    private _listComponent: CategoryListComponent;

    constructor(private notifyMessage: NotifyMessageService) {
    }

    set listComponent(value: CategoryListComponent) {
        this._listComponent = value;
    }

    showModal() {
        this._listComponent.newModal.showModal();
    }
    onError($event) {
        this.notifyMessage.error('Não foi possível criar esta Categoria');
        console.log($event);
    }

    onSuccess($event) {
        this.notifyMessage.success('Categoria criada com sucesso!');
        this._listComponent.getItems();
    }
}