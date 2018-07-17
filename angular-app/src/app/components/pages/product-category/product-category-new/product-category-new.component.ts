import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category, ProductCategory} from "../../../../model";
import {CategoryHttpService} from "../../../../services/http/category-http.service";
import {ProductCategoryHttpService} from "../../../../services/http/product-category-http.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'product-category-new',
    templateUrl: './product-category-new.component.html',
    styleUrls: ['./product-category-new.component.css']
})
export class ProductCategoryNewComponent implements OnInit {
    public categories: Category[] = [];
    public categoriesId: number[];

    @Input()
    public productId: number;
    @Input()
    public productCategory: ProductCategory;

    @Output()
    public onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output()
    public onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    constructor(private categoryHttp: CategoryHttpService,
                private productCategoryHttp: ProductCategoryHttpService) {
    }

    ngOnInit() {
        this.getCategories();
    }

    getCategories() {
        this.categoryHttp.list({all: true}).subscribe(response => this.categories = response.data);
    }

    submit() {
        this.productCategoryHttp.create(this.productId, this.mergeCategories()).subscribe(productCategory => {
            this.onSuccess.emit(productCategory);
        }, error => this.onError.emit(error));
        return false;
    }

    private mergeCategories(): number[] {
        const categoriesId = this.productCategory.categories.map(category => category.id);
        const newCategoriesId = this.categoriesId.filter(category => {
            return categoriesId.indexOf(category) < 0;
        });

        return categoriesId.concat(newCategoriesId);
    }
}
