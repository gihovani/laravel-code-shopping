import {Component, OnInit, ViewChild} from '@angular/core';
import {ChatGroup, User} from "../../../../model";
import {FieldsPagination} from "../../../../common/fields-pagination";
import {ChatGroupUserHttpService} from "../../../../services/http/chat-group-user-http.service";
import {ActivatedRoute} from "@angular/router";
import {ChatGroupUserDeleteService} from "./chat-group-user-delete.service";
import {ChatGroupUserInsertService} from "./chat-group-user-insert.service";
import {ChatGroupUserDeleteModalComponent} from "../chat-group-user-delete-modal/chat-group-user-delete-modal.component";

@Component({
    selector: 'chat-group-user-list',
    templateUrl: './chat-group-user-list.component.html',
    styleUrls: ['./chat-group-user-list.component.css']
})
export class ChatGroupUserListComponent implements OnInit {
    public userId: number = 0;
    public chatGroupId: number = 0;
    public chatGroup: ChatGroup = null;
    public users: User[] = [];

    public pagination: FieldsPagination = {
        page: 1,
        totalItems: 0,
        itemsPerPage: 15
    };

    @ViewChild(ChatGroupUserDeleteModalComponent)
    public deleteModal: ChatGroupUserDeleteModalComponent;

    constructor(private chatGroupUserHttp: ChatGroupUserHttpService,
                private route: ActivatedRoute,
                protected insertService: ChatGroupUserInsertService,
                protected deleteService: ChatGroupUserDeleteService) {
        this.insertService.listComponent = this;
        this.deleteService.listComponent = this;
    }


    ngOnInit() {
        this.route.params.subscribe(params => {
            this.chatGroupId = params.chat_group;
            this.getItems();
        });
    }

    getItems() {
        const searchParams = {
            page: this.pagination.page
        };
        this.chatGroupUserHttp.list(this.chatGroupId, searchParams).subscribe(response => {
            this.chatGroup = response.data.chat_group;
            this.users = response.data.users;
            this.pagination.totalItems = response.meta.total;
            this.pagination.itemsPerPage = response.meta.per_page;
        });

        this.userId = 0;
    }

    pageChanged(page) {
        this.pagination.page = page;
        this.getItems();
    }
}
