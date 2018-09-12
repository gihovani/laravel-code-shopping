import {Component, OnInit, ViewChild} from '@angular/core';
import {ChatGroup} from "../../../../model";
import {FieldsPagination} from "../../../../common/fields-pagination";
import {FieldsSortColumn} from "../../../../common/fields-sort-column";
import {ChatGroupNewModalComponent} from "../chat-group-new-modal/chat-group-new-modal.component";
import {ChatGroupEditModalComponent} from "../chat-group-edit-modal/chat-group-edit-modal.component";
import {ChatGroupDeleteModalComponent} from "../chat-group-delete-modal/chat-group-delete-modal.component";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ChatGroupHttpService} from "../../../../services/http/chat-group-http.service";
import {ChatGroupDeleteService} from "./chat-group-delete.service";
import {ChatGroupEditService} from "./chat-group-edit.service";
import {ChatGroupInsertService} from "./chat-group-insert.service";

@Component({
    selector: 'chat-group-list',
    templateUrl: './chat-group-list.component.html',
    styleUrls: ['./chat-group-list.component.css']
})
export class ChatGroupListComponent implements OnInit {
    public chatGroups: Array<ChatGroup> = [];
    public chatGroupId: number;
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

    @ViewChild(ChatGroupNewModalComponent)
    public newModal: ChatGroupNewModalComponent;

    @ViewChild(ChatGroupEditModalComponent)
    public editModal: ChatGroupEditModalComponent;

    @ViewChild(ChatGroupDeleteModalComponent)
    public deleteModal: ChatGroupDeleteModalComponent;

    constructor(private notifyMessage: NotifyMessageService,
                private chatGroupHttp: ChatGroupHttpService,
                public insertService: ChatGroupInsertService,
                public editService: ChatGroupEditService,
                public deleteService: ChatGroupDeleteService) {

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
        this.chatGroupHttp.list(searchParams).subscribe(response => {
            this.chatGroups = response.data
            this.pagination.totalItems = response.meta.total;
            this.pagination.itemsPerPage = response.meta.per_page;
        });

        this.chatGroupId = 0;
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
