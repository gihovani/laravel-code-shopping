import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {FieldsSearchParams} from "../../common/fields-search-params";
import {Observable} from "rxjs";
import {ChatGroup, ChatGroupLinkInvitationUser, ChatGroupLinkInvitationUserStatus} from "../../model";
import {SearchParamsBuilder} from "./http-resource";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ChatGroupLinkInvitationUserHttpService {

    constructor(private http: HttpClient) {
    }

    private getBaseUrl(chatGroupId: number, invitationId: number = null) {
        let baseUrl = `${environment.api.url}/chat_groups/${chatGroupId}/invitations`;
        if (invitationId) {
            baseUrl += `/${invitationId}`;
        }
        return baseUrl;
    }

    list(chatGroupId: number, searchParams: FieldsSearchParams): Observable<{ data: { chat_group: ChatGroup, invitations: ChatGroupLinkInvitationUser[] }, meta: any }> {
        const sParams = new SearchParamsBuilder(searchParams).makeObject();
        const params = new HttpParams({
            fromObject: (<any>sParams)
        });
        return this.http
            .get<{ data: { chat_group: ChatGroup, invitations: ChatGroupLinkInvitationUser[] }, meta: any }>(this.getBaseUrl(chatGroupId), {params});
    }

    get(chatGroupId: number, invitationId: number): Observable<ChatGroupLinkInvitationUser> {
        return this.http
            .get<{ data: ChatGroupLinkInvitationUser }>(this.getBaseUrl(chatGroupId, invitationId))
            .pipe(
                map(response => response.data)
            );
    }

    update(chatGroupId: number, invitationId: number, status: ChatGroupLinkInvitationUserStatus): Observable<ChatGroupLinkInvitationUser> {
        return this.http.patch<{ data: ChatGroupLinkInvitationUser }>(this.getBaseUrl(chatGroupId, invitationId), {status})
            .pipe(map(response => response.data));
    }
}
