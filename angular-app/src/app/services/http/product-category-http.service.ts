import {Injectable} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {ProductCategory} from "../../model";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ProductCategoryHttpService {
    private baseApi = 'http://localhost:8000/api';

    constructor(private http: HttpClient) {
    }

    private getBaseUrl(productId: number, categoryId: number = null) {
        let baseUrl = `${this.baseApi}/products/${productId}/categories`;
        if (categoryId) {
            baseUrl += `/${categoryId}`;
        }
        return baseUrl;
    }

    list(productId: number): Observable<ProductCategory> {
        const token = window.localStorage.getItem('token');
        return this.http.get<{ data: ProductCategory }>(this.getBaseUrl(productId), {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).pipe(map(response => response.data));
    }

    create(productId: number, categoriesId: number[]): Observable<ProductCategory> {
        const token = window.localStorage.getItem('token');
        return this.http.post<{ data: ProductCategory }>(this.getBaseUrl(productId), {categories: categoriesId}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).pipe(map(response => response.data));
    }

    destroy(productId: number, categoryId: number): Observable<any> {
        const token = window.localStorage.getItem('token');
        return this.http.delete(this.getBaseUrl(productId, categoryId), {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
}
