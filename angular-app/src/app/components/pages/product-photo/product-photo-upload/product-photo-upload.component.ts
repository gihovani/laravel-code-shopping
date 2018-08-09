import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {ProductPhotoHttpService} from "../../../../services/http/product-photo-http.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'product-photo-upload',
    templateUrl: './product-photo-upload.component.html',
    styleUrls: ['./product-photo-upload.component.css']
})
export class ProductPhotoUploadComponent implements OnInit {
    public errors = {};
    public productId: number;

    @Output()
    public onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output()
    public onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

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
        this.productPhotoHttp.create(this.productId, files).subscribe(productPhoto => {
            this.onSuccess.emit(productPhoto);
            this.errors = {};
        }, responseError => {
            if (responseError.status === 422) {
                this.errors = responseError.error.errors;
            }
            this.onError.emit(responseError);
        });
    }

}
