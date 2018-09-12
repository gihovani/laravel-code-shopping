import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductInputHttpService} from "../../../../services/http/product-input-http.service";
import {ProductInput} from "../../../../model";
import {ProductInputNewModalComponent} from "../product-input-new-modal/product-input-new-modal.component";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ProductInputInsertService} from "./product-input-insert.service";
import {FieldsPagination} from "../../../../common/fields-pagination";
import {FieldsSortColumn} from "../../../../common/fields-sort-column";

@Component({
    selector: 'product-input-list',
    templateUrl: './product-input-list.component.html',
    styleUrls: ['./product-input-list.component.css']
})
export class ProductInputListComponent implements OnInit {
    public inputs: Array<ProductInput> = [];
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

    @ViewChild(ProductInputNewModalComponent)
    public newModal: ProductInputNewModalComponent;


    constructor(private notifyMessage: NotifyMessageService,
                private productInputHttp: ProductInputHttpService,
                public insertService: ProductInputInsertService) {
        this.insertService.listComponent = this;
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
        this.productInputHttp.list(searchParams).subscribe(response => {
            this.inputs = response.data;
            this.pagination.totalItems = response.meta.total;
            this.pagination.itemsPerPage = response.meta.per_page;
        });
    }

    onSort($event) {
        this.getItems();
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
