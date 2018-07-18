import {Injectable} from "@angular/core";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ProductCategoryListComponent} from "./product-category-list.component";

@Injectable({
    providedIn: 'root'
})
export class ProductCategoryInsertService {
    private _listComponent: ProductCategoryListComponent;

    constructor(private notifyMessage: NotifyMessageService) {
    }

    set listComponent(value: ProductCategoryListComponent) {
        this._listComponent = value;
    }

    onError($event) {
        this.notifyMessage.error('Não foi possível adicionar as novas categorias para este produto!');
        console.log($event);
    }

    onSuccess($event) {
        this.notifyMessage.success('Categorias adicionadas no produto com sucesso!');
        this._listComponent.getItems();
    }
}