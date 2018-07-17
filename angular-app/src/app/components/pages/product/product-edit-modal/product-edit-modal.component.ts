import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {ProductHttpService} from "../../../../services/http/product-http.service";
import {Product} from "../../../../model";

@Component({
    selector: 'product-edit-modal',
    templateUrl: './product-edit-modal.component.html',
    styleUrls: ['./product-edit-modal.component.css']
})
export class ProductEditModalComponent implements OnInit {

    private _productId: number;

    public product: Product = {
        name: '',
        price: 0,
        active: false
    };
    @ViewChild(ModalComponent)
    public modal: ModalComponent;

    @Output()
    public onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output()
    public onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    constructor(private productHttp: ProductHttpService) {
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

    submit() {
        this.productHttp.update(this._productId, this.product).subscribe((product) => {
            this.modal.hide();
            this.onSuccess.emit(product);
        }, error => this.onError.emit(error));
    }

    showModal() {
        this.modal.show();
    }

    hideModal($event: Event) {
        this.product = {
            name: '',
            price: 0,
            active: false
        };
        console.log($event);
    }
}
