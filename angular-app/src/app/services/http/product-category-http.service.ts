import {Injectable} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {ProductCategory} from "../../model";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ProductCategoryHttpService {
    constructor(private http: HttpClient) {
    }

    private getBaseUrl(productId: number, categoryId: number = null) {
        let baseUrl = `${environment.api.url}/products/${productId}/categories`;
        if (categoryId) {
            baseUrl += `/${categoryId}`;
        }
        return baseUrl;
    }

    list(productId: number): Observable<ProductCategory> {
        return this.http.get<{ data: ProductCategory }>(this.getBaseUrl(productId))
            .pipe(map(response => response.data));
    }

    create(productId: number, categoriesId: number[]): Observable<ProductCategory> {
        return this.http.post<{ data: ProductCategory }>(this.getBaseUrl(productId), {categories: categoriesId})
            .pipe(map(response => response.data));
    }

    destroy(productId: number, categoryId: number): Observable<any> {
        return this.http.delete(this.getBaseUrl(productId, categoryId));
    }
}
