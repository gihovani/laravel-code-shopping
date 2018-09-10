import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import chatGroupFieldsOptions from "./chat-group-fields-options";

@Component({
    selector: 'chat-group-form',
    templateUrl: './chat-group-form.component.html',
    styleUrls: ['./chat-group-form.component.css']
})
export class ChatGroupFormComponent implements OnInit {

    @Input()
    public form: FormGroup;

    constructor() {
    }

    ngOnInit() {
    }

    get fieldsOptions() {
        return chatGroupFieldsOptions;
    }

    get name() {
        return this.fieldsOptions.name;
    }

    get photo() {
        return this.fieldsOptions.photo;
    }

    onChoosePhoto(files: FileList) {
        if (!files.length) {
            return;
        }

        this.form.get('photo').setValue(files[0]);
    }

    removePhoto() {
        this.form.get('remove_photo').setValue(1);
        return false;
    }
}
