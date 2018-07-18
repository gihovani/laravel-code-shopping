import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../model";
import {environment} from "../../../environments/environment";
import {BaseHttp} from "./base-http";

@Injectable({
    providedIn: 'root'
})
export class UserHttpService extends BaseHttp<User> {
    constructor(http: HttpClient) {
        super(http);
    }

    baseUrl(id?: number): string {
        let url = `${environment.api.url}/users`;
        if (id) {
            url += `/${id}`;
        }
        return url;
    }
}
