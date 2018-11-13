import {Component, OnInit, ViewChild} from '@angular/core';
import {ChatGroup, ChatGroupLinkInvitation} from "../../../../model";
import {FieldsPagination} from "../../../../common/fields-pagination";
import {FieldsSortColumn} from "../../../../common/fields-sort-column";
import {ActivatedRoute} from "@angular/router";
import {ChatGroupLinkInvitationHttpService} from "../../../../services/http/chat-group-link-invitation-http.service";
import {ChatGroupLinkInvInsertService} from "./chat-group-link-inv-insert.service";
import {ChatGroupLinkInvEditService} from "./chat-group-link-inv-edit.service";
import {ChatGroupLinkInvDeleteService} from "./chat-group-link-inv-delete.service";
import {ChatGroupLinkInvNewModalComponent} from "../chat-group-link-inv-new-modal/chat-group-link-inv-new-modal.component";
import {ChatGroupLinkInvEditModalComponent} from "../chat-group-link-inv-edit-modal/chat-group-link-inv-edit-modal.component";
import {ChatGroupLinkInvDeleteModalComponent} from "../chat-group-link-inv-delete-modal/chat-group-link-inv-delete-modal.component";

@Component({
    selector: 'app-chat-group-link-inv-list',
    templateUrl: './chat-group-link-inv-list.component.html',
    styleUrls: ['./chat-group-link-inv-list.component.css']
})
export class ChatGroupLinkInvListComponent implements OnInit {

    public chatGroupId: number
    public invitationId: number;
    public chatGroup: ChatGroup;
    public linkInvitations: ChatGroupLinkInvitation[] = []
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

    @ViewChild(ChatGroupLinkInvNewModalComponent)
    public newModal: ChatGroupLinkInvNewModalComponent;
    @ViewChild(ChatGroupLinkInvEditModalComponent)
    public editModal: ChatGroupLinkInvEditModalComponent;
    @ViewChild(ChatGroupLinkInvDeleteModalComponent)
    public deleteModal: ChatGroupLinkInvDeleteModalComponent;

    constructor(private route: ActivatedRoute,
                private linkInvHttp: ChatGroupLinkInvitationHttpService,
                public insertService: ChatGroupLinkInvInsertService,
                public editService: ChatGroupLinkInvEditService,
                public deleteService: ChatGroupLinkInvDeleteService) {

        this.insertService.listComponent = this;
        this.editService.listComponent = this;
        this.deleteService.listComponent = this;
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.chatGroupId = params.chat_group;
            this.getItems();
        });
    }


    getItems() {
        this.linkInvHttp.list(this.chatGroupId, {
            page: this.pagination.page,
            sort: this.sortColumn.column === '' ? null : this.sortColumn,
            search: this.searchText
        }).subscribe(response => {
            this.chatGroup = response.data.chat_group;
            this.linkInvitations = response.data.link_invitations;
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
