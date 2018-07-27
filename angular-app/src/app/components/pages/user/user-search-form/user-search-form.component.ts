import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'user-search-form',
  templateUrl: './user-search-form.component.html',
  styleUrls: ['./user-search-form.component.css']
})
export class UserSearchFormComponent implements OnInit {

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
