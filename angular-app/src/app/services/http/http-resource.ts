import {Observable} from "rxjs/internal/Observable";
import {FieldsSearchParams} from "../../common/fields-search-params";

export class SearchParamsBuilder {
    constructor(private searchParams: FieldsSearchParams) {
    }

    makeObject(): FieldsSearchParams {
        const sParams: any = {
            page: this.searchParams.page + ''
        };
        if (this.searchParams.all) {
            sParams.all = '1';
            delete sParams.page;
        }
        if (this.searchParams.search && this.searchParams.search !== '') {
            sParams.search = this.searchParams.search;
        }
        if (this.searchParams.sort) {
            const sortSymbol = this.searchParams.sort.sort === 'desc' ? '-' : '';
            const columnName = this.searchParams.sort.column;
            sParams.sort = `${sortSymbol}${columnName}`;
        }
        return sParams;
    }
}

export interface HttpResource<T> {

    list(searchParams: FieldsSearchParams): Observable<{ data: Array<T>, meta: any }>;

    get(id: number): Observable<T>;

    create(data: T): Observable<T>;

    update(id: number, data: T): Observable<T>;

    destroy(id: number): Observable<any>;
}
