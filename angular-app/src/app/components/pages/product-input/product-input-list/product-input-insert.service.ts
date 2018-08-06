import {Injectable} from "@angular/core";
import {ProductInputListComponent} from "./product-input-list.component";
import {NotifyMessageService} from "../../../../services/notify-message.service";

@Injectable({
    providedIn: 'root'
})

export class ProductInputInsertService {
    private _listComponent: ProductInputListComponent;

    constructor(private notifyMessage: NotifyMessageService) {
    }

    set listComponent(value: ProductInputListComponent) {
        this._listComponent = value;
    }

    showModal() {
        this._listComponent.newModal.showModal();
    }

    onError($event) {
        this.notifyMessage.error('Não foi possível adicionar esta entrada de estoque');
        console.log($event);
    }

    onSuccess($event) {
        this.notifyMessage.success('Entrada de estoque criada com sucesso');
        this._listComponent.getItems();
    }
}