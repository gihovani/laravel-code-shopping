import {Component, OnInit, ViewChild} from '@angular/core';
import {CategoryNewModalComponent} from "../category-new-modal/category-new-modal.component";
import {CategoryEditModalComponent} from "../category-edit-modal/category-edit-modal.component";
import {CategoryDeleteModalComponent} from "../category-delete-modal/category-delete-modal.component";
import {CategoryHttpService} from "../../../../services/http/category-http.service";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {CategoryInsertService} from "./category-insert.service";
import {CategoryEditService} from "./category-edit.service";
import {CategoryDeleteService} from "./category-delete.service";
import {Category} from "../../../../model";
import {FieldsPagination} from "../../../../common/fields-pagination";
import {FieldsSortColumn} from "../../../../common/fields-sort-column";

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
    public categories: Array<Category> = [];
    public categoryId: number;
    public pagination: FieldsPagination = {
        page: 1,
        totalItems: 0,
        itemsPerPage: 15
    };
    public sortColumn: FieldsSortColumn = {
        column: 'created_at',
        sort: 'desc'
    };
    public searchText: string;

    @ViewChild(CategoryNewModalComponent)
    public newModal: CategoryNewModalComponent;

    @ViewChild(CategoryEditModalComponent)
    public editModal: CategoryEditModalComponent;

    @ViewChild(CategoryDeleteModalComponent)
    public deleteModal: CategoryDeleteModalComponent;

    constructor(private notifyMessage: NotifyMessageService,
                private categoryHttp: CategoryHttpService,
                public insertService: CategoryInsertService,
                public editService: CategoryEditService,
                public deleteService: CategoryDeleteService) {

        this.insertService.listComponent = this;
        this.editService.listComponent = this;
        this.deleteService.listComponent = this;
    }

    ngOnInit() {
        this.getItems();
    }

    getItems() {
        const searchParams = {
            page: this.pagination.page,
            sort: this.sortColumn.column === '' ? null : this.sortColumn,
            search: this.searchText
        };
        this.categoryHttp.list(searchParams).subscribe(response => {
            this.categories = response.data
            this.pagination.totalItems = response.meta.total;
            this.pagination.itemsPerPage = response.meta.per_page;
        });

        this.categoryId = 0;
    }

    pageChanged(page) {
        this.pagination.page = page;
        this.getItems();
    }

    onSort($event) {
        this.getItems();
    }

    search(search) {
        this.searchText = search;
        this.getItems();
    }
}
