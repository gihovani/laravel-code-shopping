import {Injectable} from "@angular/core";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ProductCategoryListComponent} from "./product-category-list.component";

@Injectable({
    providedIn: 'root'
})
export class ProductCategoryDeleteService {
    private _listComponent: ProductCategoryListComponent;

    constructor(private notifyMessage: NotifyMessageService) {
    }

    set listComponent(value: ProductCategoryListComponent) {
        this._listComponent = value;
    }

    showModal(productId: number, categoryId: number) {
        this._listComponent.productId = productId;
        this._listComponent.categoryId = categoryId;
        this._listComponent.deleteModal.showModal();
    }

    onError($event) {
        this.notifyMessage.error('Não foi possível remover este categoria');
        console.log($event);
    }

    onSuccess($event) {
        this.notifyMessage.success('Categoria removida com sucesso!');
        this._listComponent.getItems();
    }
}