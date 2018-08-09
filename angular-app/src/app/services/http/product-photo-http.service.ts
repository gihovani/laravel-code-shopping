import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product, ProductPhoto} from "../../model";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ProductPhotoHttpService {

    constructor(private http: HttpClient) {
    }

    baseUrl(productId: number, photoId?: number): string {
        let url = `${environment.api.url}/products/${productId}/photos`;
        if (photoId) {
            url += `/${photoId}`;
        }
        return url;
    }

    list(productId: number): Observable<{ product: Product, photos: ProductPhoto[] }> {
        return this.http.get<{ data: any }>(this.baseUrl(productId))
            .pipe(map(response => response.data));
    }

    create(productId: number, files: FileList): Observable<{ product: Product, photos: ProductPhoto[] }> {
        const formData = new FormData();
        const filesArray = Array.from(files);
        filesArray.forEach((file) => {
            formData.append('photos[]', file);
        });

        return this.http.post<any>(this.baseUrl(productId), formData);
    }

    update(productId: number, photoId: number, file: File): Observable<ProductPhoto> {
        const formData = new FormData();
        formData.append('photo', file);
        formData.append('_method', 'PUT');

        return this.http.post<{ data: ProductPhoto }>(this.baseUrl(productId, photoId), formData)
            .pipe(map(response => response.data));
    }

    destroy(productId: number, photoId: number): Observable<any> {
        return this.http.delete(this.baseUrl(productId, photoId));
    }
}
