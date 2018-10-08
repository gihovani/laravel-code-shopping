import {Component} from '@angular/core';
import {FirebaseAuthProvider} from "../../providers/auth/firebase-auth";
import {ChatGroup, ChatMessage} from "../../model";
import {ChatGroupFbProvider} from "../../providers/firebase/chat-group-fb";

/**
 * Generated class for the ChatGroupListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'chat-group-list',
    templateUrl: 'chat-group-list.html'
})
export class ChatGroupListComponent {
    groups: ChatGroup[] = [];

    constructor(private firebaseAuth: FirebaseAuthProvider,
                private chatGroupFb: ChatGroupFbProvider) {
    }

    ngOnInit() {
        this.chatGroupFb
            .list()
            .subscribe(groups => this.groups = groups);

        this.chatGroupFb
            .onAdded()
            .subscribe(group => this.groups.unshift(group));

        this.chatGroupFb
            .onChanged()
            .subscribe(group => {
                const index = this.groups.findIndex(g => g.id === group.id);
                if (index < 0) {
                    return;
                }
                this.groups.splice(index, 1);
                this.groups.unshift(group)
            });

    }

    formatTextMessage(message: ChatMessage) {
        return message.content.length > 20 ? message.content.slice(0, 20) + '...' : message.content;
    }
}
