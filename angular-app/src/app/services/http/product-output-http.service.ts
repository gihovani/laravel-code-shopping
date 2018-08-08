import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {ProductOutput} from "../../model";
import {map} from "rxjs/operators";
import {FieldsSearchParams} from "../../common/fields-search-params";
import {SearchParamsBuilder} from "./http-resource";

@Injectable({
    providedIn: 'root'
})
export class ProductOutputHttpService {

    constructor(private http: HttpClient) {
    }

    baseUrl(id?: number): string {
        let url = `${environment.api.url}/product_outputs`;
        if (id) {
            url += `/${id}`;
        }
        return url;
    }

    create(data: { amount: number, product_id: number }): Observable<ProductOutput> {
        return this.http.post<{ data: ProductOutput }>(this.baseUrl(), data)
            .pipe(map(response => response.data));
    }

    get(id: number): Observable<ProductOutput> {
        return this.http.get<{ data: ProductOutput }>(this.baseUrl(id))
            .pipe(map(response => response.data));
    }

    list(searchParams: FieldsSearchParams): Observable<{ data: Array<ProductOutput>; meta: any }> {
        const sParams = new SearchParamsBuilder(searchParams).makeObject();
        const params = new HttpParams({
            fromObject: (<any>sParams)
        });
        return this.http.get<{ data: Array<ProductOutput>; meta: any }>(this.baseUrl(), {params});

    }
}
