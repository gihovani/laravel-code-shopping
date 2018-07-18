import {HttpResource, SearchParams, SearchParamsBuilder} from "./http-resource";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs/internal/Observable";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export abstract class BaseHttp<T> implements HttpResource<T> {
    abstract baseUrl(id?: number): string;

    constructor(private http: HttpClient) {
    }

    create(data: T): Observable<T> {
        return this.http.post<{ data: T }>(this.baseUrl(), data)
            .pipe(map(response => response.data));
    }

    destroy(id: number): Observable<any> {
        return this.http.delete(this.baseUrl(id));
    }

    get(id: number): Observable<T> {
        return this.http.get<{ data: T }>(this.baseUrl(id)).pipe(map(response => response.data));
    }

    list(searchParams: SearchParams): Observable<{ data: Array<T>; meta: any }> {
        const sParams = new SearchParamsBuilder(searchParams).makeObject();
        const params = new HttpParams({
            fromObject: (<any>sParams)
        });
        return this.http.get<{ data: Array<T>, meta: any }>(this.baseUrl(), {params});
    }

    update(id: number, data: T): Observable<T> {
        return this.http.put<{ data: T }>(this.baseUrl(id), data)
            .pipe(map(response => response.data));
    }
}