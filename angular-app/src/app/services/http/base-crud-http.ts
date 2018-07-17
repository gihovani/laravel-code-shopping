import {HttpResource, SearchParams, SearchParamsBuilder} from "./http-resource";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs/internal/Observable";

export abstract class BaseCrudHttp<T> implements HttpResource<T> {
    constructor(private http: HttpClient) {
    }

    abstract baseUrl();

    create(data: T): Observable<T> {
        const token = window.localStorage.getItem('token');
        return this.http.post<{ data: T }>(this.baseUrl(), data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).pipe(map(response => response.data));
    }

    destroy(id: number): Observable<any> {
        const token = window.localStorage.getItem('token');
        return this.http.delete(`${this.baseUrl()}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    get(id: number): Observable<T> {
        const token = window.localStorage.getItem('token');
        return this.http.get<{ data: T }>(`${this.baseUrl()}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).pipe(map(response => response.data));
    }

    list(searchParams: SearchParams): Observable<{ data: Array<T>; meta: any }> {
        const token = window.localStorage.getItem('token');
        const sParams = new SearchParamsBuilder(searchParams).makeObject();
        const params = new HttpParams({
            fromObject: (<any>sParams)
        });
        return this.http.get<{ data: Array<T>, meta: any }>(this.baseUrl(), {
            params,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    update(id: number, data: T): Observable<T> {
        const token = window.localStorage.getItem('token');
        return this.http.put<{ data: T }>(`${this.baseUrl()}/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).pipe(map(response => response.data));
    }
}