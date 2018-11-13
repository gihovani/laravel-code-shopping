import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {FieldsSearchParams} from "../../common/fields-search-params";
import {Observable} from "rxjs";
import {ChatGroup, ChatGroupLinkInvitation} from "../../model";
import {SearchParamsBuilder} from "./http-resource";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ChatGroupLinkInvitationHttpService {
    constructor(private http: HttpClient) {
    }

    private getBaseUrl(chatGroupId: number, invitationId: number = null) {
        let baseUrl = `${environment.api.url}/chat_groups/${chatGroupId}/link_invitations`;
        if (invitationId) {
            baseUrl += `/${invitationId}`;
        }
        return baseUrl;
    }

    list(chatGroupId: number, searchParams: FieldsSearchParams): Observable<{ data: { chat_group: ChatGroup, link_invitations: ChatGroupLinkInvitation[] }, meta: any }> {
        const sParams = new SearchParamsBuilder(searchParams).makeObject();
        const params = new HttpParams({
            fromObject: (<any>sParams)
        });
        return this.http
            .get<{ data: { chat_group: ChatGroup, link_invitations: ChatGroupLinkInvitation[] }, meta: any }>(this.getBaseUrl(chatGroupId), {params});
    }

    get(chatGroupId: number, invitationId: number): Observable<ChatGroupLinkInvitation> {
        return this.http
            .get<{ data: ChatGroupLinkInvitation }>(this.getBaseUrl(chatGroupId, invitationId))
            .pipe(
                map(response => response.data)
            );
    }

    create(chatGroupId: number, data: ChatGroupLinkInvitation): Observable<ChatGroupLinkInvitation> {
        return this.http.post<{ data: ChatGroupLinkInvitation }>(this.getBaseUrl(chatGroupId), data)
            .pipe(map(response => response.data));
    }

    update(chatGroupId: number, invitationId: number, data: ChatGroupLinkInvitation): Observable<ChatGroupLinkInvitation> {
        return this.http.put<{ data: ChatGroupLinkInvitation }>(this.getBaseUrl(chatGroupId, invitationId), data)
            .pipe(map(response => response.data));
    }

    destroy(chatGroupId: number, invitationId: number): Observable<any> {
        return this.http.delete(this.getBaseUrl(chatGroupId, invitationId));
    }
}
