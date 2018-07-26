import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {SortColumn} from "../../../model";

@Component({
    selector: '[sortColumn]',
    templateUrl: './sort-column.component.html',
    styleUrls: ['./sort-column.component.css']
})
export class SortColumnComponent implements OnInit {

    @Input()
    public sortColumn: SortColumn;

    @Input()
    public columnName: string;

    @Output()
    public onSort: EventEmitter<SortColumn> = new EventEmitter<SortColumn>();
    constructor() {
    }

    ngOnInit() {
    }

    @HostListener('click')
    changeSort() {
        this.sortColumn.column = this.columnName;
        this.sortColumn.sort = this.sortColumn.sort === 'desc' ? 'asc' : 'desc';
        this.onSort.emit(this.sortColumn);
    }

    showArrowDown() {
        return this.columnName === this.sortColumn.column && this.sortColumn.sort === 'desc';
    }

    showArrowUp() {
        return this.columnName === this.sortColumn.column && this.sortColumn.sort === 'asc';
    }
}
