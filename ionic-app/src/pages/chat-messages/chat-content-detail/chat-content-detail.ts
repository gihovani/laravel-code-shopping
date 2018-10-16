import {Component, Input} from '@angular/core';
import {ChatMessage} from "../../../model";
import {PhotoViewer} from "@ionic-native/photo-viewer";
import {BuildUrlPipe} from "../../../pipes/build-url/build-url";

/**
 * Generated class for the ChatContentDetailComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'chat-content-detail',
    templateUrl: 'chat-content-detail.html'
})
export class ChatContentDetailComponent {

    @Input()
    message: ChatMessage;

    constructor(private photoViewer: PhotoViewer, private buildUrl: BuildUrlPipe) {
    }

    showImage(message: ChatMessage) {
        const url = this.buildUrl.transform(message.content);
        this.photoViewer.show(url, 'Imagem', {share: true});
    }
}
