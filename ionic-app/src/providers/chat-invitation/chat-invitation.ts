import {Injectable} from '@angular/core';
import {FirebaseDynamicLinks, IDynamicLink} from "@ionic-native/firebase-dynamic-links";
import {HttpClient} from "@angular/common/http";
import {environment} from "@app/env";
import {LoadingController, ToastController} from "ionic-angular";
import {AuthProvider} from "../auth/auth";

const CHAT_GROUP_INVITATION_SLUG = 'chat_group_invitation_slug';

/*
  Generated class for the ChatInvitationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatInvitationProvider {

    constructor(private fbDynamicLinks: FirebaseDynamicLinks,
                private http: HttpClient,
                private loadingCtrl: LoadingController,
                private toastCtrl: ToastController,
                private auth: AuthProvider) {
    }


    listen() {
        this.fbDynamicLinks
            .onDynamicLink()
            .subscribe((res: IDynamicLink) => {
                this.saveInStorage(res.deepLink);
                this.requestInvitationIfAuth();
            });
    }

    private requestInvitationIfAuth() {
        this.auth.isAuth().then(isAuth => {
            if (isAuth) {
                this.requestInvitation();
            }
        });
    }

    requestInvitation() {
        if (!this.slug) {
            return;
        }

        const loader = this.loadingCtrl.create({
            content: 'Entrando no grupo...'
        });
        loader.present();

        const slug = this.slug;
        this.slug = null;
        this.http.post(`${environment.api.url}/chat_invitations/${slug}`, {}).subscribe(() => {
            loader.dismiss();
            const toast = this.toastCtrl.create({
                message: 'Inscrição aceita, espere um administrador aprovar seu convite',
                duration: 3000
            });
            toast.present();
        }, error => {
            loader.dismiss();
            let message = 'Não foi possível entrar no grupo';
            if (error.status == 403 || error.status == 422) {
                message = error.error.message;
            }
            const toast = this.toastCtrl.create({
                message: message,
                duration: 3000
            });
            toast.present();
        });
    }

    private saveInStorage(deepLink: string) {
        this.slug = this.getInvitationSlugFromLink(deepLink);
    }

    private get slug() {
        return window.localStorage.getItem(CHAT_GROUP_INVITATION_SLUG);
    }

    private set slug(value) {
        value ? window.localStorage.setItem(CHAT_GROUP_INVITATION_SLUG, value) : window.localStorage.removeItem(CHAT_GROUP_INVITATION_SLUG);
    }

    private getInvitationSlugFromLink(deepLink: string) {
        const deepLinkFirstPart = deepLink.split('&')[0];
        return deepLinkFirstPart.substring(deepLinkFirstPart.lastIndexOf('/') + 1, deepLinkFirstPart.length);
    }
}
