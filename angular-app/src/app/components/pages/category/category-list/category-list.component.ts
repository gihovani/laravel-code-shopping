import {Component, OnInit, ViewChild} from '@angular/core';
import {CategoryNewModalComponent} from "../category-new-modal/category-new-modal.component";
import {CategoryEditModalComponent} from "../category-edit-modal/category-edit-modal.component";
import {CategoryDeleteModalComponent} from "../category-delete-modal/category-delete-modal.component";
import {CategoryHttpService} from "../../../../services/http/category-http.service";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {CategoryInsertService} from "./category-insert.service";
import {CategoryEditService} from "./category-edit.service";
import {CategoryDeleteService} from "./category-delete.service";

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
    public categories: Array<Category> = [];
    public categoryId: number;
    public pagination = {
        page: 1,
        totalItems: 0,
        itemsPerPage: 15
    };

    @ViewChild(CategoryNewModalComponent)
    public newModal: CategoryNewModalComponent;

    @ViewChild(CategoryEditModalComponent)
    public editModal: CategoryEditModalComponent;

    @ViewChild(CategoryDeleteModalComponent)
    public deleteModal: CategoryDeleteModalComponent;

    constructor(private notifyMessage: NotifyMessageService,
                private categoryHttp: CategoryHttpService,
                protected insertService: CategoryInsertService,
                protected editService: CategoryEditService,
                protected deleteService: CategoryDeleteService) {

        this.insertService.listComponent = this;
        this.editService.listComponent = this;
        this.deleteService.listComponent = this;
    }

    ngOnInit() {
        this.getItems();
    }

    getItems() {
        this.categoryHttp.list(this.pagination.page).subscribe(response => {
            this.categories = response.data
            this.pagination.totalItems = response.meta.total;
            this.pagination.itemsPerPage = response.meta.per_page;
        });
    }

    pageChanged(page) {
        this.pagination.page = page;
        this.getItems();
    }
}
