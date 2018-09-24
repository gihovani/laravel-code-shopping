import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponseBase
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthProvider} from "../auth/auth";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {NavController} from "ionic-angular";
import {LoginOptionsPage} from "../../pages/login-options/login-options";

/*
  Generated class for the RefreshTokenInterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RefreshTokenInterceptorProvider implements HttpInterceptor {

    constructor(private authService: AuthProvider) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next
            .handle(req)
            .pipe(
                tap((event: HttpEvent<any>) => {
                        this.setNewTokenIfResponseValid(event);
                    },
                    (eventError: HttpEvent<any>) => {
                        this.setNewTokenIfResponseValid(eventError);
                        this.redirectToLoginIfUnauthenticated(eventError);
                    })
            );
    }

    private redirectToLoginIfUnauthenticated(eventError: HttpEvent<any>) {
        if (eventError instanceof HttpErrorResponse && eventError.status == 401) {
            // this.authService.setToken(null);
        }
    }

    private setNewTokenIfResponseValid(event: HttpEvent<any>) {
        if (event instanceof HttpResponseBase) {
            const authorizationHeader = event.headers.get('authorization');
            if (authorizationHeader) {
                // const token = authorizationHeader.split(' ')[1];
                // this.authService.setToken(token);
            }
        }
    }

}
