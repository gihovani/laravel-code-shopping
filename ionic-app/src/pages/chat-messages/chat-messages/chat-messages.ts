import {Component, ViewChild} from '@angular/core';
import {Content, InfiniteScroll, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FirebaseAuthProvider} from "../../../providers/auth/firebase-auth";
import {ChatGroup, ChatMessage} from "../../../model";
import {ChatMessageFb} from "../../../providers/firebase/chat-message-fb";
import {IsCurrentUserPipe} from "../../../pipes/is-current-user/is-current-user";
import {RedirectIfNotAuthProvider} from "../../../providers/redirect-if-not-auth/redirect-if-not-auth";


/**
 * Generated class for the ChatMessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-chat-messages',
    templateUrl: 'chat-messages.html',
})
export class ChatMessagesPage {
    chatGroup: ChatGroup;
    messages: { key: string, value: ChatMessage }[] = [];
    limit = 20;
    showContent = false;
    canMoreMessages = true;
    countNewMessages = 0;

    @ViewChild(Content)
    content: Content;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private chatMessageFb: ChatMessageFb,
                private firebaseAuth: FirebaseAuthProvider,
                private isCurrentUser: IsCurrentUserPipe,
                private redirectIfNotAuth: RedirectIfNotAuthProvider) {

        this.chatGroup = this.navParams.get('chat_group');
        // this.chatGroup = {
        //     id: 1,
        //     name: '',
        //     photo_url: '',
        //     viewed: false
        // };
    }

    ionViewCanEnter() {
        return this.redirectIfNotAuth.ionViewCanEnter();
    }

    ionViewDidLoad() {
        this.chatMessageFb.latest(this.chatGroup, this.limit)
            .subscribe((messages) => {
                this.messages = messages;
                setTimeout(() => {
                    this.scrollToBottom();
                    this.showContent = true;
                }, 500);
            });
        this.chatMessageFb.onAdded(this.chatGroup).subscribe((message) => {
            this.messages.push(message);
            this.countNewMessages++;

            if (this.isCurrentUser.transform(message.value.user_id)) {
                this.scrollToBottom();
            }
        });
    }

    doInfinite(infinityScroll: InfiniteScroll) {
        this.chatMessageFb.oldest(this.chatGroup, this.limit, this.messages[0].key).subscribe((messages) => {
            if (messages.length) {
                this.canMoreMessages = false;
            }
            this.messages.unshift(...messages);
            infinityScroll.complete();
        }, error => {
            infinityScroll.complete();
        });
    }

    scrollToBottom() {
        this.countNewMessages = 0;
        this.content.scrollToBottom(0);
    }

    showButtonScrollBottom() {
        const dimensions = this.content.getContentDimensions();
        const contentHeight = dimensions.contentHeight;
        const scrollTop = dimensions.scrollTop;
        const scrollHeight = dimensions.scrollHeight;

        return scrollHeight > scrollTop + contentHeight;
    }

}
