import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {ChatGroupListComponent} from "../../components/chat-group-list/chat-group-list";
import {AudioRecorderProvider} from "../../providers/audio-recorder/audio-recorder";
import {RedirectIfNotAuthProvider} from "../../providers/redirect-if-not-auth/redirect-if-not-auth";
import {MoreOptionsComponent} from "../../components/more-options/more-options";
import {PushNotificationProvider} from "../../providers/push-notification/push-notification";
import {FirebaseMessaging} from "@ionic-native/firebase-messaging";
import {SuperTab} from "ionic2-super-tabs";

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-main',
    templateUrl: 'main.html',
})
export class MainPage {

    chatGroupList = ChatGroupListComponent;

    @ViewChild('chatGroupList')
    tabChatGroupList: SuperTab;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private audioRecorder: AudioRecorderProvider,
                private redirectIfNotAuth: RedirectIfNotAuthProvider,
                private popover: PopoverController,
                private pushNotification: PushNotificationProvider,
                private fcm: FirebaseMessaging) {
    }

    ionViewCanEnter() {
        return this.redirectIfNotAuth.ionViewCanEnter();
    }

    ionViewDidLoad() {
        this.pushNotification.registerToken();
        this.fcm.onBackgroundMessage().subscribe((data) => {
            const component: ChatGroupListComponent = this.tabChatGroupList.getViews()[0].instance;
            component.goToMessagesFromNotification(data.chat_group_id);
        });
        const hasPermissionToRecorder = this.audioRecorder.hasPermission;
        this.audioRecorder.requestPermission()
            .then((result) => {
                if (result && !hasPermissionToRecorder) {
                    this.audioRecorder.showAlertToCloseApp();
                }
            });
    }

    presentMoreOptions(event) {
        const popover = this.popover.create(MoreOptionsComponent);
        popover.present({
            ev: event
        });
    }
}
