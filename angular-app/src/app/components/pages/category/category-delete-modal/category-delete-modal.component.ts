import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {CategoryHttpService} from "../../../../services/http/category-http.service";
import {Category} from "../../../../model";

@Component({
    selector: 'category-delete-modal',
    templateUrl: './category-delete-modal.component.html',
    styleUrls: ['./category-delete-modal.component.css']
})
export class CategoryDeleteModalComponent implements OnInit {
    private _categoryId: number;
    public category: Category = null;

    @Output()
    public onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output()
    public onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    @ViewChild(ModalComponent)
    modal: ModalComponent;

    constructor(private categoryHttp: CategoryHttpService) {
    }

    ngOnInit() {

    }

    @Input()
    set categoryId(value) {
        if (!value) return;

        this._categoryId = value;
        this.categoryHttp.get(value).subscribe(response => {
            this.category = response;
        });
    }

    destroy() {
        this.categoryHttp.destroy(this._categoryId).subscribe(category => {
            this.modal.hide();
            this.onSuccess.emit(category);
        }, error => this.onError.emit(error));
    }

    showModal() {
        this.modal.show();
    }

    hideModal($event: Event) {
        console.log($event);
    }
}
