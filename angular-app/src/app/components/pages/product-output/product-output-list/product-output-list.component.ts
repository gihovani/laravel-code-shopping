import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductOutput} from "../../../../model";
import {FieldsPagination} from "../../../../common/fields-pagination";
import {FieldsSortColumn} from "../../../../common/fields-sort-column";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ProductOutputInsertService} from "./product-output-insert.service";
import {FieldsSearchParams} from "../../../../common/fields-search-params";
import {ProductOutputHttpService} from "../../../../services/http/product-output-http.service";
import {ProductOutputNewModalComponent} from "../product-output-new-modal/product-output-new-modal.component";

@Component({
    selector: 'product-output-list',
    templateUrl: './product-output-list.component.html',
    styleUrls: ['./product-output-list.component.css']
})
export class ProductOutputListComponent implements OnInit {
    public outputs: Array<ProductOutput> = [];
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

    @ViewChild(ProductOutputNewModalComponent)
    public newModal: ProductOutputNewModalComponent;

    constructor(private notifyMessage: NotifyMessageService,
                private productOutputHttp: ProductOutputHttpService,
                public insertService: ProductOutputInsertService) {
        this.insertService.listComponent = this;
    }

    ngOnInit() {
        this.getItems();
    }


    getItems() {
        const searchParams: FieldsSearchParams = {
            page: this.pagination.page,
            sort: this.sortColumn.column === '' ? null : this.sortColumn,
            search: this.searchText
        };
        this.productOutputHttp.list(searchParams).subscribe(response => {
            this.outputs = response.data;
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
