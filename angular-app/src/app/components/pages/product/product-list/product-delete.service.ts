import {Injectable} from "@angular/core";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ProductListComponent} from "./product-list.component";

@Injectable({
    providedIn: 'root'
})
export class ProductDeleteService {
    private _listComponent: ProductListComponent;

    constructor(private notifyMessage: NotifyMessageService) {
    }

    set listComponent(value: ProductListComponent) {
        this._listComponent = value;
    }

    showModal(productId: number) {
        this._listComponent.productId = productId;
        this._listComponent.deleteModal.showModal();
    }

    onError($event) {
        this.notifyMessage.error('Não foi possível remover este Produto');
        console.log($event);
    }

    onSuccess($event) {
        this.notifyMessage.success('Produto apagado com sucesso!');
        this._listComponent.getItems();
    }
}