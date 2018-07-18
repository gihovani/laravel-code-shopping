import {Component, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
    selector: 'modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

    @Output()
    public onHide: EventEmitter<Event> = new EventEmitter<Event>();
    constructor(private element: ElementRef, private router: Router) {
    }

    ngOnInit() {
        const jqueryElement = this.getJqueryElement();
        jqueryElement.find('[modal-title]').addClass('modal-title');
        jqueryElement.find('[modal-body]').addClass('modal-body');
        jqueryElement.find('[modal-footer]').addClass('modal-footer');
        jqueryElement.on('hidden.bs.modal', (e) => {
            this.onHide.emit(e);
        });
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                if (event.url === '/login') {
                    this.hide();
                }
            }
        });
    }
    show() {
        this.getJqueryElement().modal('show');
    }

    hide() {
        this.getJqueryElement().modal('hide');
    }

    private getJqueryElement() {
        const nativeElement = this.element.nativeElement;
        return $(nativeElement.firstChild);
    }
}

declare const $;
