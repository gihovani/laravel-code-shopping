import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import chatGroupLinkInvFieldsOptions from "./chat-group-link-inv-fields-options";

@Component({
    selector: 'chat-group-link-inv-form',
    templateUrl: './chat-group-link-inv-form.component.html',
    styleUrls: ['./chat-group-link-inv-form.component.css']
})
export class ChatGroupLinkInvFormComponent implements OnInit {

    @Input()
    public form: FormGroup;

    constructor() {
    }

    ngOnInit() {
    }

    get fieldsOptions() {
        return chatGroupLinkInvFieldsOptions;
    }

    get total() {
        return this.fieldsOptions.total;
    }

    get remaining() {
        return this.fieldsOptions.remaining;
    }

    get expires_at() {
        return this.fieldsOptions.expires_at;
    }

}
