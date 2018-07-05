import {Injectable} from "@angular/core";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {CategoryListComponent} from "./category-list.component";

@Injectable({
    providedIn: 'root'
})
export class CategoryDeleteService {
    private _categoryListComponent: CategoryListComponent;

    constructor(private notifyMessage: NotifyMessageService) {
    }

    set categoryListComponent(value: CategoryListComponent) {
        this._categoryListComponent = value;
    }

    showModalDelete(categoryId: number) {
        this._categoryListComponent.categoryId = categoryId;
        this._categoryListComponent.categoryDeleteModal.showModal();
    }

    onError($event) {
        this.notifyMessage.error('Não foi possível remover esta Categoria');
        console.log($event);
    }

    onSuccess($event) {
        this.notifyMessage.success('Categoria apagada com sucesso!');
        this._categoryListComponent.getCategories();
    }
}