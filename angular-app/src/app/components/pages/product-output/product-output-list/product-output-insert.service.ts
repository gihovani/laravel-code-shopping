import {Injectable} from "@angular/core";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ProductOutputListComponent} from "./product-output-list.component";

@Injectable({
    providedIn: 'root'
})

export class ProductOutputInsertService {
    private _listComponent: ProductOutputListComponent;

    constructor(private notifyMessage: NotifyMessageService) {
    }

    set listComponent(value: ProductOutputListComponent) {
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