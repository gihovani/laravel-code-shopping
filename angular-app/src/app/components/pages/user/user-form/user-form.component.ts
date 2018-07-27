import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../model";

@Component({
    selector: 'user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
    @Input()
    public user: User = {
        name: '',
        email: '',
        password: ''
    };
    constructor() { }

    ngOnInit() {
    }
}
