import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {ProductHttpService} from "../../../../services/http/product-http.service";

@Component({
  selector: 'product-delete-modal',
  templateUrl: './product-delete-modal.component.html',
  styleUrls: ['./product-delete-modal.component.css']
})
export class ProductDeleteModalComponent implements OnInit {
    private _productId: number;
    public product: Product = null;

    @Output()
    public onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output()
    public onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    @ViewChild(ModalComponent)
    modal: ModalComponent;

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

    destroy() {
        this.productHttp.destroy(this._productId).subscribe(product => {
            this.modal.hide();
            this.onSuccess.emit(product);
        }, error => this.onError.emit(error));
    }

    showModal() {
        this.modal.show();
    }

    hideModal($event: Event) {
        this.product = null;
        console.log($event);
    }

}
