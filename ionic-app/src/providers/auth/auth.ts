import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {FirebaseAuthProvider} from "./firebase-auth";
import {fromPromise} from "rxjs/observable/fromPromise";
import {flatMap, tap} from "rxjs/operators";
import {User} from "../../model";
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from "@app/env";
import {forkJoin} from "rxjs/observable/forkJoin";

declare const cordova;

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
            .pipe(
                flatMap(token => {
                    return this.http
                        .post<{ token: string }>(`${environment.api.url}/login_vendor`, {token})
                        .pipe(
                            tap(data => {
                                this.setToken(data.token);
                            })
                        );
                })
            );
    }

    setToken(token: string) {
        this.setUserFromToken(token);
        token ? window.localStorage.setItem(TOKEN_KEY, token) : window.localStorage.removeItem(TOKEN_KEY);
    }

    getToken(): string | null {
        return window.localStorage.getItem(TOKEN_KEY);
    }

    async isFullyAuth(): Promise<boolean> {
        return Promise.all([this.isAuth(), this.firebaseAuth.isAuth()])
            .then(values => values[0] && values[1]);
    }

    async isAuth(): Promise<boolean> {
        const token = this.getToken();
        if (!token) {
            return false;
        }
        if (this.isTokenExpired(token)) {
            try {
                await this.refresh().toPromise();
            } catch (e) {
                console.log('erro ao fazer refresh token', e);
                return false
            }
        }

        return true;
    }

    isTokenExpired(token: string) {
        return new JwtHelperService().isTokenExpired(token, 30);
    }

    refresh(): Observable<{ token: string }> {
        return this.http.post<{ token: string }>(this.refreshUrl(), {})
            .pipe(tap(data => this.setToken(data.token)));
    }

    refreshUrl() {
        return `${environment.api.url}/refresh`;
    }

    private setUserFromToken(token: string) {
        const decodedToken = new JwtHelperService().decodeToken(token);
        this.me = decodedToken ? {
            id: decodedToken.sub,
            name: decodedToken.name,
            email: decodedToken.email,
            role: decodedToken.role,
            profile: decodedToken.profile
        } : null;
        return
    }

    logout(): Observable<any> {
        return forkJoin(
            this.firebaseAuth.firebase.auth().signOut(),
            cordova.plugins.firebase.auth.signOut(),
            this.http.post(`${environment.api.url}/logout`, {})
                .pipe(
                    tap(() => {
                        this.setToken(null);
                    })
                )
        );

    }
}
