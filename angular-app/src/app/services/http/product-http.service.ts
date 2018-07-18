import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseHttp} from "./base-http";
import {Product} from "../../model";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ProductHttpService extends BaseHttp<Product> {
    constructor(http: HttpClient) {
        super(http);
    }

    baseUrl(id?: number): string {
        let url = `${environment.api.url}/products`;
        if (id) {
            url += `/${id}`;
        }
        return url;
    }
}
