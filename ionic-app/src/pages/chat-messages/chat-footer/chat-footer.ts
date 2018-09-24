import {Component, ViewChild} from '@angular/core';
import {ChatMessageHttpProvider} from "../../../providers/http/chat-message-http";
import {TextInput} from "ionic-angular";

/**
 * Generated class for the ChatFooterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'chat-footer',
    templateUrl: 'chat-footer.html'
})
export class ChatFooterComponent {

    text: string = '';
    @ViewChild('inputFileImage')
    inputFileImage: TextInput;

    constructor(private chatMessageHttp: ChatMessageHttpProvider) {

    }

    sendMessage(data: {content, type}) {
        this.chatMessageHttp.create(1, data)
            .subscribe(response => {
                this.text = '';
                console.log('enviou');
            });
    }

    sendMessageText() {
        if (!this.text.length) {
            return;
        }

        this.sendMessage({content: this.text, type: 'text'});
    }
    sendMessageImage(files: FileList) {
        if (!files.length) {
            return;
        }

        this.sendMessage({content: files[0], type: 'image'});
    }

    selectImage() {
        const nativeElement: HTMLElement = this.inputFileImage.getElementRef().nativeElement;
        const inputFile = nativeElement.querySelector('input');
        inputFile.click();
    }
}
