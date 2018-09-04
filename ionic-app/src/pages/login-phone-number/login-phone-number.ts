import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FirebaseAuthProvider} from "../../providers/auth/firebase-auth";
import {AuthProvider} from "../../providers/auth/auth";
import {MainPage} from "../main/main";

/**
 * Generated class for the LoginPhoneNumberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-login-phone-number',
    templateUrl: 'login-phone-number.html',
})
export class LoginPhoneNumberPage {

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private firebaseAuth: FirebaseAuthProvider,
                private authService: AuthProvider) {
    }

    ionViewDidLoad() {
        const unsubscribed = this.firebaseAuth.firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.authService.login().subscribe(token => {
                    //redirect to main page
                    this.redirectToMainPage();
                }, responseError => {
                    //redirect to create account
                    this.redirectToCustomerCreatePage();
                });
                unsubscribed();
            }
        });

        this.firebaseAuth.makePhoneNumberForm('#firebase-ui');
    }

    redirectToMainPage() {
        this.navCtrl.setRoot(MainPage);
    }

    redirectToCustomerCreatePage() {
        console.log('redirect to create account');
    }
}
