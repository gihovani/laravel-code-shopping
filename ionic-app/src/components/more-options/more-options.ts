import {Component} from '@angular/core';
import {AuthProvider} from "../../providers/auth/auth";
import {App, ViewController} from "ionic-angular";
import {LoginOptionsPage} from "../../pages/login-options/login-options";

/**
 * Generated class for the MoreOptionsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'more-options',
    templateUrl: 'more-options.html'
})
export class MoreOptionsComponent {

    constructor(private auth: AuthProvider, private app: App, private viewCtrl: ViewController) {
    }

    logout() {
        this.auth.logout().subscribe(() => {
            this.viewCtrl.dismiss();
            this.app.getRootNav().setRoot(LoginOptionsPage);
        }, error => {
            console.log('error', error);
        });
    }
}
