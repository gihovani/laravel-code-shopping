import {Component, OnInit} from '@angular/core';
import {ChatGroup, ChatGroupLinkInvitationUser, ChatGroupLinkInvitationUserStatus} from "../../../../model";
import {FieldsPagination} from "../../../../common/fields-pagination";
import {FieldsSortColumn} from "../../../../common/fields-sort-column";
import {ActivatedRoute} from "@angular/router";
import {ChatGroupLinkInvitationHttpService} from "../../../../services/http/chat-group-link-invitation-http.service";
import {ChatGroupLinkInvitationUserHttpService} from "../../../../services/http/chat-group-link-invitation-user-http.service";

@Component({
    selector: 'app-chat-group-link-inv-user-list',
    templateUrl: './chat-group-link-inv-user-list.component.html',
    styleUrls: ['./chat-group-link-inv-user-list.component.css']
})
export class ChatGroupLinkInvUserListComponent implements OnInit {
    public chatGroupId: number
    public invitationId: number;
    public chatGroup: ChatGroup;
    public invitations: ChatGroupLinkInvitationUser[] = []
    public pagination: FieldsPagination = {
        page: 1,
        totalItems: 0,
        itemsPerPage: 15
    };
    public sortColumn: FieldsSortColumn = {
        column: 'created_at',
        sort: 'desc'
    };
    public STATUS = ChatGroupLinkInvitationUserStatus;
    public searchText: string;


    constructor(private route: ActivatedRoute,
                private userInvHttp: ChatGroupLinkInvitationUserHttpService) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.chatGroupId = params.chat_group;
            this.getItems();
        });
    }


    getItems() {
        this.userInvHttp.list(this.chatGroupId, {
            page: this.pagination.page,
            sort: this.sortColumn.column === '' ? null : this.sortColumn,
            search: this.searchText
        }).subscribe(response => {
            this.chatGroup = response.data.chat_group;
            this.invitations = response.data.invitations;
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
