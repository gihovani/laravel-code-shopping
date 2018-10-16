import {Injectable} from '@angular/core';
import {FirebaseAuthProvider} from "../auth/firebase-auth";
import {Observable} from "rxjs";
import {ChatGroup, ChatMessage, ChatUser} from "../../model";

/*
  Generated class for the ChatGroupFbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatMessageFb {
    private database;

    constructor(private firebaseAuth: FirebaseAuthProvider) {
        this.database = this.firebaseAuth.firebase.database();
    }

    latest(group: ChatGroup, limit: number): Observable<{ key: string, value: ChatMessage }[]> {
        return Observable.create(observer => {
            this.database.ref(`/chat_groups_messages/${group.id}/messages`)
                .orderByKey()
                .limitToLast(limit)
                .once('value', (data) => {
                    const messages = [];
                    data.forEach(child => {
                        let message = child.val() as ChatMessage;
                        message.user$ = this.getUser(message.user_id);
                        messages.push({key: child.key, value: message});
                    });
                    observer.next(messages);
                });
        });
    }

    oldest(group: ChatGroup, limit: number, messageKey: string): Observable<{ key: string, value: ChatMessage }[]> {
        return Observable.create(observer => {
            this.database.ref(`/chat_groups_messages/${group.id}/messages`)
                .orderByKey()
                .limitToLast(limit + 1)
                .endAt(messageKey)
                .once('value', (data) => {
                    const messages = [];
                    data.forEach(child => {
                        let message = child.val() as ChatMessage;
                        message.user$ = this.getUser(message.user_id);
                        messages.push({key: child.key, value: message});
                    });
                    messages.splice(-1, 1);
                    observer.next(messages);
                });
        });
    }

    onAdded(group: ChatGroup): Observable<{ key: string, value: ChatMessage }> {
        return Observable.create(observer => {
            this.database.ref(`/chat_groups_messages/${group.id}/messages`)
                .orderByChild('created_at')
                .startAt(Date.now())
                .on('child_added', (data) => {
                    let message = data.val() as ChatMessage;
                    message.user$ = this.getUser(message.user_id);
                    observer.next({key: data.key, value: message});
                });
        });
    }

    private getUser(userId: string): Observable<ChatUser> {
        return Observable.create(observer => {
            this.database.ref(`users/${userId}`)
                .once('value', data => {
                    const user = data.val();
                    observer.next(user);
                });
        });
    }
}
