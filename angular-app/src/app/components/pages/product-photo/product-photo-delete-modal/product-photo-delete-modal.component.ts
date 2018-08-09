import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {ProductPhotoHttpService} from "../../../../services/http/product-photo-http.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'product-photo-delete-modal',
    templateUrl: './product-photo-delete-modal.component.html',
    styleUrls: ['./product-photo-delete-modal.component.css']
})
export class ProductPhotoDeleteModalComponent implements OnInit {
    public errors = {};
    public productId: number;

    @Input()
    public photoId: number;

    @Output()
    public onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output()
    public onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    @ViewChild(ModalComponent)
    public modal: ModalComponent;

    constructor(private productPhotoHttp: ProductPhotoHttpService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.productId = params.product;
        });
    }

    destroy() {
        this.productPhotoHttp.destroy(this.productId, this.photoId).subscribe(response => {
            this.onSuccess.emit(response);
        }, responseError => {
            if (responseError.status === 422) {
                this.errors = responseError.error.errors;
            }
            this.onError.emit(responseError);
        });
    }

    showModal() {
        this.modal.show();
    }

    hideModal() {
        this.modal.hide();
    }

}
