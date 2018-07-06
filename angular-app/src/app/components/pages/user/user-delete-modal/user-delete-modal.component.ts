import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {UserHttpService} from "../../../../services/http/user-http.service";

@Component({
    selector: 'user-delete-modal',
    templateUrl: './user-delete-modal.component.html',
    styleUrls: ['./user-delete-modal.component.css']
})
export class UserDeleteModalComponent implements OnInit {
    private _userId: number;
    public user: User = null;

    @Output()
    public onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output()
    public onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    @ViewChild(ModalComponent)
    modal: ModalComponent;

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

    destroy() {
        this.userHttp.destroy(this._userId).subscribe(user => {
            this.modal.hide();
            this.onSuccess.emit(user);
        }, error => this.onError.emit(error));
    }

    showModal() {
        this.modal.show();
    }

    hideModal($event: Event) {
        this.user = null;
        console.log($event);
    }
}
