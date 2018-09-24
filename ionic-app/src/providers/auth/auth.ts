import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {FirebaseAuthProvider} from "./firebase-auth";
import {fromPromise} from "rxjs/observable/fromPromise";
import {flatMap} from "rxjs/operators";
import {User} from "../../model";
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from "@app/env";

const TOKEN_KEY = 'code_shopping_token';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
    public me: User = null;

    constructor(public http: HttpClient,
                private firebaseAuth: FirebaseAuthProvider) {
        const token = this.getToken();
        this.setUserFromToken(token);
    }

    login(): Observable<{ token: string }> {
        return fromPromise(this.firebaseAuth.getToken())
            .pipe(flatMap(token => {
                return this.http.post<{ token: string }>(`${environment.api.url}/login_vendor`, {token});
            }));
    }

    setToken(token: string) {
        this.setUserFromToken(token);
        token ? window.localStorage.setItem(TOKEN_KEY, token) : window.localStorage.removeItem(TOKEN_KEY);
    }

    getToken(): string | null {
        return window.localStorage.getItem(TOKEN_KEY);
    }

    isAuth(): boolean {
        const token = this.getToken();
        return !new JwtHelperService().isTokenExpired(token, 30);
    }

    private setUserFromToken(token: string) {
        const decodedToken = new JwtHelperService().decodeToken(token);
        this.me = decodedToken ? {
            id: decodedToken.sub,
            name: decodedToken.name,
            email: decodedToken.email,
            profile: decodedToken.profile
        } : null;
        return
    }
}
