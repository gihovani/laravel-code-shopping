import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";
import chatGroupUserFieldsOptions from "./chat-group-user-fields-options";
import {ChatGroupUserHttpService} from "../../../../services/http/chat-group-user-http.service";

@Component({
    selector: 'chat-group-user-new',
    templateUrl: './chat-group-user-new.component.html',
    styleUrls: ['./chat-group-user-new.component.css']
})
export class ChatGroupUserNewComponent implements OnInit {
    public form: FormGroup;
    public errors = {};

    @Input()
    public chatGroupId: number;

    @Output()
    public onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output()
    public onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    constructor(private chatGroupUserHttp: ChatGroupUserHttpService,
                private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            user_id: [],
        });
    }

    ngOnInit() {
    }

    submit() {
        this.chatGroupUserHttp.create(this.chatGroupId, this.getUserIds()).subscribe(response => {
            this.onSuccess.emit(response);
            this.form.reset();
            this.errors = {};
        }, responseError => {
            if (responseError.status === 422) {
                this.errors = responseError.error.errors;
            }
            this.onError.emit(responseError);
        });
        return false;
    }

    getUserIds(): number[] {
        const usersId = this.form.get('user_id').value;
        if (!usersId) {
            return [];
        }

        if (typeof usersId === 'string') {
            return [parseInt(usersId)];
        }

        return usersId;
    }

    get fieldsOptions() {
        return chatGroupUserFieldsOptions;
    }

    get user_id() {
        return this.fieldsOptions.user_id;
    }
}
