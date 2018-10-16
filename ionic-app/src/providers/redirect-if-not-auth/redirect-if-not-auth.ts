import {Injectable} from '@angular/core';
import {AuthProvider} from "../auth/auth";
import {App} from "ionic-angular";
import {LoginOptionsPage} from "../../pages/login-options/login-options";

/*
  Generated class for the RedirectIfNotAuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RedirectIfNotAuthProvider {

    constructor(private auth: AuthProvider, private app: App) {
    }

    ionViewCanEnter(): Promise<boolean> {
        return this.auth
            .isFullyAuth()
            .then(isAuth => {
                if (!isAuth) {
                    setTimeout(() => {
                        this.app.getRootNav().setRoot(LoginOptionsPage);
                    })
                }

                return isAuth;
            })
    }
}
