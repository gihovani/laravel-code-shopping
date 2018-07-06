import {Injectable} from "@angular/core";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ProductListComponent} from "./product-list.component";

@Injectable({
    providedIn: 'root'
})
export class ProductInsertService {
    private _listComponent: ProductListComponent;

    constructor(private notifyMessage: NotifyMessageService) {
    }

    set listComponent(value: ProductListComponent) {
        this._listComponent = value;
    }

    showModal() {
        this._listComponent.newModal.showModal();
    }
    onError($event) {
        this.notifyMessage.error('Não foi possível criar este Produto');
        console.log($event);
    }

    onSuccess($event) {
        this.notifyMessage.success('Produto criado com sucesso!');
        this._listComponent.getItems();
    }
}