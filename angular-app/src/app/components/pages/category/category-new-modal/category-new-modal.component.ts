import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {CategoryHttpService} from "../../../../services/http/category-http.service";

@Component({
    selector: 'category-new-modal',
    templateUrl: './category-new-modal.component.html',
    styleUrls: ['./category-new-modal.component.css']
})
export class CategoryNewModalComponent implements OnInit {
    public category: Category = {
        name: '',
        active: false
    };
    @ViewChild(ModalComponent)
    public modal: ModalComponent;

    @Output()
    public onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output()
    public onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    constructor(private categoryHttp: CategoryHttpService) {
    }

    ngOnInit() {
    }


    submit() {
        this.categoryHttp.create(this.category).subscribe(category => {
            this.modal.hide();
            this.onSuccess.emit(category);
        }, error => this.onError.emit(error));
    }

    showModal() {
        this.modal.show();
    }

    hideModal($event: Event) {
        this.category = {
            name: '',
            active: false
        };
        console.log($event);
    }
}
