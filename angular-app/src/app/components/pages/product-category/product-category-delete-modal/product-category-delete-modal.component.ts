import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Category, Product} from "../../../../model";
import {HttpErrorResponse} from "@angular/common/http";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {ProductHttpService} from "../../../../services/http/product-http.service";
import {CategoryHttpService} from "../../../../services/http/category-http.service";
import {ProductCategoryHttpService} from "../../../../services/http/product-category-http.service";

@Component({
    selector: 'product-category-delete-modal',
    templateUrl: './product-category-delete-modal.component.html',
    styleUrls: ['./product-category-delete-modal.component.css']
})
export class ProductCategoryDeleteModalComponent implements OnInit {
    private _productId: number;
    private _categoryId: number;
    public product: Product = null;
    public category: Category = null;

    @Output()
    public onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output()
    public onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    @ViewChild(ModalComponent)
    modal: ModalComponent;

    constructor(private productHttp: ProductHttpService,
                private categoryHttp: CategoryHttpService,
                private productCategoryHttp: ProductCategoryHttpService) {
    }

    ngOnInit() {

    }

    @Input()
    set productId(value) {
        if (!value) return;

        this._productId = value;
        this.productHttp.get(value).subscribe(response => {
            this.product = response;
        });
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
        this.productCategoryHttp.destroy(this._productId, this._categoryId)
            .subscribe(productCategory => {
                this.modal.hide();
                this.onSuccess.emit(productCategory);
            }, error => this.onError.emit(error));
    }

    showModal() {
        this.modal.show();
    }

    hideModal($event: Event) {
        console.log($event);
    }
}
