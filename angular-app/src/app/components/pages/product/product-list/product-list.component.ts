import {Component, OnInit, ViewChild} from '@angular/core';
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ProductHttpService} from "../../../../services/http/product-http.service";
import {ProductNewModalComponent} from "../product-new-modal/product-new-modal.component";
import {ProductEditModalComponent} from "../product-edit-modal/product-edit-modal.component";
import {ProductDeleteModalComponent} from "../product-delete-modal/product-delete-modal.component";
import {ProductInsertService} from "./product-insert.service";
import {ProductDeleteService} from "./product-delete.service";
import {ProductEditService} from "./product-edit.service";
import {Product, SortColumn} from "../../../../model";

@Component({
    selector: 'product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    public items: Array<Product> = [];
    public productId: number;
    public pagination = {
        page: 1,
        totalItems: 0,
        itemsPerPage: 15
    };
    public sortColumn: SortColumn = {column: 'id', sort: 'desc'};
    public searchText: string;

    @ViewChild(ProductNewModalComponent)
    public newModal: ProductNewModalComponent;

    @ViewChild(ProductEditModalComponent)
    public editModal: ProductEditModalComponent;

    @ViewChild(ProductDeleteModalComponent)
    public deleteModal: ProductDeleteModalComponent;

    constructor(private notifyMessage: NotifyMessageService,
                private productHttp: ProductHttpService,
                protected insertService: ProductInsertService,
                protected editService: ProductEditService,
                protected deleteService: ProductDeleteService) {

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
        this.productHttp.list(searchParams).subscribe(response => {
            this.items = response.data
            this.pagination.totalItems = response.meta.total;
            this.pagination.itemsPerPage = response.meta.per_page;
        });

        this.productId = 0;
    }

    pageChanged(page) {
        this.pagination.page = page;
        this.getItems();
    }

    search(search) {
        this.searchText = search;
        this.getItems();
    }
}
