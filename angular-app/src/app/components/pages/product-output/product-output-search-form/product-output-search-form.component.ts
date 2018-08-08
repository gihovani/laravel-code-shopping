import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'product-output-search-form',
    templateUrl: './product-output-search-form.component.html',
    styleUrls: ['./product-output-search-form.component.css']
})
export class ProductOutputSearchFormComponent implements OnInit {
    public search = '';
    @Output()
    public onSearch: EventEmitter<string> = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit() {
    }

    submit() {
        this.onSearch.emit(this.search);
        return false;
    }

    clear() {
        this.search = '';
        this.submit();
    }
}
