import {Component, OnInit, ViewChild} from '@angular/core';
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {UserNewModalComponent} from "../user-new-modal/user-new-modal.component";
import {UserHttpService} from "../../../../services/http/user-http.service";
import {UserInsertService} from "./user-insert.service";
import {UserEditService} from "./user-edit.service";
import {UserDeleteService} from "./user-delete.service";
import {UserEditModalComponent} from "../user-edit-modal/user-edit-modal.component";
import {UserDeleteModalComponent} from "../user-delete-modal/user-delete-modal.component";
import {SortColumn, User} from "../../../../model";

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
    public users: Array<User> = [];
    public userId: number;
    public pagination = {
        page: 1,
        totalItems: 0,
        itemsPerPage: 15
    };
    public sortColumn: SortColumn = {column: 'id', sort: 'desc'};
    public searchText: string;

    @ViewChild(UserNewModalComponent)
    public newModal: UserNewModalComponent;

    @ViewChild(UserEditModalComponent)
    public editModal: UserEditModalComponent;

    @ViewChild(UserDeleteModalComponent)
    public deleteModal: UserDeleteModalComponent;

    constructor(private notifyMessage: NotifyMessageService,
                private userHttp: UserHttpService,
                protected insertService: UserInsertService,
                protected editService: UserEditService,
                protected deleteService: UserDeleteService) {

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
        this.userHttp.list(searchParams).subscribe(response => {
            this.users = response.data
            this.pagination.totalItems = response.meta.total;
            this.pagination.itemsPerPage = response.meta.per_page;
        });
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
