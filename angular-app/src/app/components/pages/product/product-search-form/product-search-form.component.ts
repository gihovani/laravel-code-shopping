import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'product-search-form',
  templateUrl: './product-search-form.component.html',
  styleUrls: ['./product-search-form.component.css']
})
export class ProductSearchFormComponent implements OnInit {
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
        this.onSearch.emit(this.search);
    }
}
