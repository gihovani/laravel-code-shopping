import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {ChatGroup, User} from "../../model";
import {map} from "rxjs/operators";
import {FieldsSearchParams} from "../../common/fields-search-params";
import {SearchParamsBuilder} from "./http-resource";

@Injectable({
    providedIn: 'root'
})
export class ChatGroupUserHttpService {
    constructor(private http: HttpClient) {
    }

    private getBaseUrl(chatGroupId: number, userId: number = null) {
        let baseUrl = `${environment.api.url}/chat_groups/${chatGroupId}/users`;
        if (userId) {
            baseUrl += `/${userId}`;
        }
        return baseUrl;
    }

    list(chatGroupId: number, searchParams: FieldsSearchParams): Observable<{ data: { chat_group: ChatGroup, users: User[] }, meta: any }> {
        const sParams = new SearchParamsBuilder(searchParams).makeObject();
        const params = new HttpParams({
            fromObject: (<any>sParams)
        });
        return this.http
            .get<{ data: { chat_group: ChatGroup, users: User[] }, meta: any }>(this.getBaseUrl(chatGroupId), {params});
    }

    create(chatGroupId: number, userId: number[]): Observable<{ chat_group: ChatGroup, users: User[] }> {
        return this.http.post<{ data: { chat_group: ChatGroup, users: User[] } }>(this.getBaseUrl(chatGroupId), {users: userId})
            .pipe(map(response => response.data));
    }

    destroy(chatGroupId: number, userId: number): Observable<any> {
        return this.http.delete(this.getBaseUrl(chatGroupId, userId));
    }
}
