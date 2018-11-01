import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {tap} from "rxjs/operators";
import {Profile, User} from "../../model";
import {environment} from "@app/env";
import {AuthProvider} from "../auth/auth";

@Injectable()
export class UserProfileHttp {

    constructor(private http: HttpClient,
                private authService: AuthProvider) {
    }

    baseUrl(): string {
        const url = `${environment.api.url}/profile`;
        return url;
    }

    private formDataToSend(data): FormData {
        const dataKeys = Object.keys(data);
        this.deletePhotoKey(dataKeys);
        const formData = new FormData();
        for (const key of dataKeys) {
            if (data[key] !== '' && data[key] !== null) {
                formData.append(key, data[key]);
            }
        }

        if (data.photo instanceof File) {
            formData.append('photo', data.photo);
        }
        if (data.photo === null) {
            formData.append('remove_photo', '1');
        }
        formData.append('_method', 'PATCH');
        return formData;
    }

    private deletePhotoKey(array) {
        const index = array.indexOf('photo');
        if (index >= 0) {
            array.splice(index, 1);
        }
    }

    update(data: Profile): Observable<{ user: User, token: string }> {
        const formData = this.formDataToSend(data)
        return this.http.post<{ user: User, token: string }>(this.baseUrl(), formData)
            .pipe(tap(response => {
                this.authService.setToken(response.token);
            }));
    }
}
