import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import userFieldsOptions from "../user-new-modal/user-fields-options";

@Component({
    selector: 'user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
    @Input()
    public form: FormGroup;
    constructor() { }

    ngOnInit() {
    }

    get fieldOptions() {
        return userFieldsOptions;
    }

    get name() {
        return this.fieldOptions.name;
    }

    get email() {
        return this.fieldOptions.email;
    }

    get password() {
        return this.fieldOptions.password;
    }
}
