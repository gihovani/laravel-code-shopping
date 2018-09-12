import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductHttpService} from "../../../../services/http/product-http.service";
import {Product, ProductCategory} from "../../../../model";
import {ProductCategoryHttpService} from "../../../../services/http/product-category-http.service";
import {ProductCategoryDeleteModalComponent} from "../product-category-delete-modal/product-category-delete-modal.component";
import {ProductCategoryDeleteService} from "./product-category-delete.service";
import {ProductCategoryInsertService} from "./product-category-insert.service";

@Component({
    selector: 'product-category-list',
    templateUrl: './product-category-list.component.html',
    styleUrls: ['./product-category-list.component.css']
})
export class ProductCategoryListComponent implements OnInit {
    public productId: number = 0;
    public categoryId: number = 0;
    public product: Product = null;
    public productCategory: ProductCategory = null;

    @ViewChild(ProductCategoryDeleteModalComponent)
    public deleteModal: ProductCategoryDeleteModalComponent;

    constructor(private route: ActivatedRoute,
                private productHttp: ProductHttpService,
                private productCategoryHttp: ProductCategoryHttpService,
                public insertService: ProductCategoryInsertService,
                public deleteService: ProductCategoryDeleteService) {
        this.insertService.listComponent = this;
        this.deleteService.listComponent = this;
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.productId = params.product;
            this.getItems();
        });
    }
    getItems() {
        this.productCategoryHttp.list(this.productId).subscribe(productCategory => {
            this.productCategory = productCategory;
            this.product = productCategory.product;
        });
    }
}
