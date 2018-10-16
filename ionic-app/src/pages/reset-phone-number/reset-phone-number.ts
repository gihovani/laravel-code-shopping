import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormControl, Validators} from "@angular/forms";
import {FirebaseAuthProvider} from "../../providers/auth/firebase-auth";
import {CustomerHttpProvider} from "../../providers/http/customer-http";
import {LoginOptionsPage} from "../login-options/login-options";
import {environment} from "@app/env";

/**
 * Generated class for the ResetPhoneNumberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-reset-phone-number',
    templateUrl: 'reset-phone-number.html',
})
export class ResetPhoneNumberPage {
    showFirebaseUI = environment.showFirebaseUI;
    email = new FormControl('', [Validators.required, Validators.email]);
    hasBtnEmailClicked = false;


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private firebaseAuth: FirebaseAuthProvider,
                private customerHttp: CustomerHttpProvider,
                private alertCtrl: AlertController,
                private toastCtrl: ToastController,
                private loadingCtrl: LoadingController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ResetPhoneNumberPage');
    }

    loadFirebaseUi() {
        this.hasBtnEmailClicked = true;
        this.handleUpdate();
    }

    handleUpdate() {
        if (!environment.showFirebaseUI) {
            return;
        }
        this.firebaseAuth
            .makePhoneNumberForm('#firebase-ui')
            .then(() => {
                this.requestUpdatePhoneNumber();
            });
    }

    requestUpdatePhoneNumber() {
        const loader = this.loadingCtrl.create({
            content: 'Carregando...'
        });
        loader.present();

        const email = this.email.value;
        this.customerHttp
            .requestUpdatePhoneNumber(email)
            .subscribe(() => {
                loader.dismiss();
                this.handleUpdateSuccess();
            }, () => {
                loader.dismiss();
                this.handleUpdateError();
            });
    }

    handleUpdateSuccess() {
        const alert = this.alertCtrl.create({
            title: 'Alerta',
            subTitle: `
              Um e-mail com a validação da mudança foi enviado.
              Valide-o para logar com o novo telefone.
              `,
            buttons: [{
                text: 'Ok',
                handler: () => {
                    this.navCtrl.setRoot(LoginOptionsPage)
                }
            }]
        });
        alert.present();
    }

    handleUpdateError() {
        const toast = this.toastCtrl.create({
            message: 'Não foi possível fazer a alteração do telefone.',
            duration: 3000
        });
        toast.present();
        this.handleUpdate();
    }
}
