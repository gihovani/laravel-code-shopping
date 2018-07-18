import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {UserHttpService} from "../../../../services/http/user-http.service";
import {User} from "../../../../model";

@Component({
  selector: 'user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.css']
})
export class UserEditModalComponent implements OnInit {

    private _userId:number;

    public user: User = {
        name: '',
        email: '',
        password: ''
    };
    @ViewChild(ModalComponent)
    public modal: ModalComponent;

    @Output()
    public onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output()
    public onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    constructor(private userHttp: UserHttpService) {
    }

    ngOnInit() {
    }

    @Input()
    set userId(value) {
        if (!value) return;

        this._userId = value;
        this.userHttp.get(value).subscribe(response => {
            this.user = response;
        });
    }

    submit() {
        this.userHttp.update(this._userId, this.user).subscribe((user) => {
            this.modal.hide();
            this.onSuccess.emit(user);
        }, error => this.onError.emit(error));
    }

    showModal() {
        this.modal.show();
    }

    hideModal($event: Event) {
        console.log($event);
    }

}
