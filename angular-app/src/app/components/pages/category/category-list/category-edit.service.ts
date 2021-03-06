import {Injectable} from "@angular/core";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {CategoryListComponent} from "./category-list.component";

@Injectable({
    providedIn: 'root'
})
export class CategoryEditService {
    private _listComponent: CategoryListComponent;

    constructor(private notifyMessage: NotifyMessageService) {
    }

    set listComponent(value: CategoryListComponent) {
        this._listComponent = value;
    }

    showModal(categoryId: number) {
        this._listComponent.categoryId = categoryId;
        this._listComponent.editModal.showModal();
    }

    onError($event) {
        this.notifyMessage.error('Não foi possível atualizar os dados desta Categoria');
        console.log($event);
    }

    onSuccess($event) {
        this.notifyMessage.success('Categoria alterada com sucesso!');
        this._listComponent.getItems();
    }
}