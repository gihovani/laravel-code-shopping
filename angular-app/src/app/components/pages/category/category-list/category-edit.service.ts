import {Injectable} from "@angular/core";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {CategoryListComponent} from "./category-list.component";

@Injectable({
    providedIn: 'root'
})
export class CategoryEditService {
    private _categoryListComponent: CategoryListComponent;

    constructor(private notifyMessage: NotifyMessageService) {
    }

    set categoryListComponent(value: CategoryListComponent) {
        this._categoryListComponent = value;
    }

    showModalEdit(categoryId: number) {
        this._categoryListComponent.categoryId = categoryId;
        this._categoryListComponent.categoryEditModal.showModal();
    }

    onError($event) {
        this.notifyMessage.error('Não foi possível atualizar os dados desta Categoria');
        console.log($event);
    }

    onSuccess($event) {
        this.notifyMessage.success('Categoria alterada com sucesso!');
        this._categoryListComponent.getCategories();
    }
}