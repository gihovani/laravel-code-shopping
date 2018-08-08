import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ProductInput} from "../../model";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs/internal/Observable";
import {map} from "rxjs/operators";
import {SearchParamsBuilder} from "./http-resource";
import {FieldsSearchParams} from "../../common/fields-search-params";

@Injectable({
    providedIn: 'root'
})
export class ProductInputHttpService {

    constructor(private http: HttpClient) {
    }

    baseUrl(id?: number): string {
        let url = `${environment.api.url}/product_inputs`;
        if (id) {
            url += `/${id}`;
        }
        return url;
    }

    create(data: { amount: number, product_id: number }): Observable<ProductInput> {
        return this.http.post<{ data: ProductInput }>(this.baseUrl(), data)
            .pipe(map(response => response.data));
    }

    get(id: number): Observable<ProductInput> {
        return this.http.get<{ data: ProductInput }>(this.baseUrl(id)).pipe(map(response => response.data));
    }

    list(searchParams: FieldsSearchParams): Observable<{ data: Array<ProductInput>; meta: any }> {
        const sParams = new SearchParamsBuilder(searchParams).makeObject();
        const params = new HttpParams({
            fromObject: (<any>sParams)
        });
        return this.http.get<{ data: Array<ProductInput>, meta: any }>(this.baseUrl(), {params});
    }

}
