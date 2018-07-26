import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'category-search-form',
    templateUrl: './category-search-form.component.html',
    styleUrls: ['./category-search-form.component.css']
})
export class CategorySearchFormComponent implements OnInit {

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

}
