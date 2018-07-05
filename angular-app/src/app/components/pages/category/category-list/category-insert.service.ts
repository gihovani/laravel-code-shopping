import {Injectable} from "@angular/core";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {CategoryListComponent} from "./category-list.component";

@Injectable({
    providedIn: 'root'
})
export class CategoryInsertService {
    private _categoryListComponent: CategoryListComponent;

    constructor(private notifyMessage: NotifyMessageService) { }

    set categoryListComponent(value: CategoryListComponent) {
        this._categoryListComponent = value;
    }
    showModalInsert() {
        this._categoryListComponent.categoryNewModal.showModal();
    }
    onError($event) {
        this.notifyMessage.error('Não foi possível criar esta Categoria');
        console.log($event);
    }

    onSuccess($event) {
        this.notifyMessage.success('Categoria criada com sucesso!');
        this._categoryListComponent.getCategories();
    }
}