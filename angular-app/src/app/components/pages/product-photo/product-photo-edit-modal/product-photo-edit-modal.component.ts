import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {ProductPhotoHttpService} from "../../../../services/http/product-photo-http.service";
import {ActivatedRoute} from "@angular/router";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";

@Component({
    selector: 'product-photo-edit-modal',
    templateUrl: './product-photo-edit-modal.component.html',
    styleUrls: ['./product-photo-edit-modal.component.css']
})
export class ProductPhotoEditModalComponent implements OnInit {
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

    submit(files: FileList) {
        if (!files.length) {
            return;
        }
        this.productPhotoHttp.update(this.productId, this.photoId, files[0]).subscribe(productPhoto => {
            this.onSuccess.emit(productPhoto);
            this.errors = {};
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
