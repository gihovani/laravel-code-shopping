import {Component, OnInit, ViewChild} from '@angular/core';
import {Product, ProductPhoto} from "../../../../model";
import {ProductPhotoHttpService} from "../../../../services/http/product-photo-http.service";
import {ActivatedRoute} from "@angular/router";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ProductPhotoEditModalComponent} from "../product-photo-edit-modal/product-photo-edit-modal.component";
import {ProductPhotoDeleteModalComponent} from "../product-photo-delete-modal/product-photo-delete-modal.component";

declare const $;

@Component({
    selector: 'product-photo-manager',
    templateUrl: './product-photo-manager.component.html',
    styleUrls: ['./product-photo-manager.component.css']
})
export class ProductPhotoManagerComponent implements OnInit {
    public photos: ProductPhoto[] = [];
    public product: Product = null;

    public photoIdToEdit: number;
    private productId: number;

    @ViewChild(ProductPhotoEditModalComponent)
    public editModal: ProductPhotoEditModalComponent;

    @ViewChild(ProductPhotoDeleteModalComponent)
    public deleteModal: ProductPhotoDeleteModalComponent;

    constructor(private productPhotoHttp: ProductPhotoHttpService,
                private route: ActivatedRoute,
                private notifyMessage: NotifyMessageService) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.productId = params.product;
            this.getPhotos();
        });
        this.configFancyBox();
    }

    getPhotos() {
        this.productPhotoHttp.list(this.productId).subscribe(productPhotos => {
            this.photos = productPhotos.photos;
            this.product = productPhotos.product;
        });
    }

    configFancyBox() {
        $.fancybox.defaults.btnTpl.edit = `
           <a class="fancybox-button text-center" data-fancybox-edit title="Substituir" href="javascript:void(0)">
            <i class="fas fa-edit"></i>
           </a>
        `;
        $.fancybox.defaults.btnTpl.delete = `
           <a class="fancybox-button text-center" data-fancybox-delete title="Apagar" href="javascript:void(0)">
            <i class="fas fa-trash"></i>
           </a>
        `;
        $.fancybox.defaults.buttons = ['download', 'edit', 'delete', 'thumbs', 'close'];
        $('body').on('click', '[data-fancybox-edit]', (e) => {
            this.photoIdToEdit = this.getImageIdFromSlideShow();
            this.editModal.showModal();
        }).on('click', '[data-fancybox-delete]', (e) => {
            this.photoIdToEdit = this.getImageIdFromSlideShow();
            this.deleteModal.showModal();
        });
    }

    getImageIdFromSlideShow() {
        const src = $('.fancybox-slide--current .fancybox-image').attr('src');
        const id = $('[data-fancybox="gallery"]').find(`[src="${src}"]`).attr('id');
        return id.split('-')[1];
    }

    getImageIndexFromPhotos() {
        const index = this.photos.findIndex((photo: ProductPhoto) => {
            return photo.id == this.photoIdToEdit;
        });
        return index;
    }

    onSuccess(data: { photos: ProductPhoto[] }) {
        this.photos.push(...data.photos);
        this.notifyMessage.success('Foto(s) cadastradas com sucesso!');
    }

    onEditSuccess(data: ProductPhoto) {
        $.fancybox.getInstance().close();
        this.editModal.hideModal();
        const index = this.getImageIndexFromPhotos();

        this.photos[index] = data;
        this.notifyMessage.success('Foto alterada com sucesso!');
    }

    onDeleteSuccess(data: any) {
        $.fancybox.getInstance().close();
        this.deleteModal.hideModal();
        const index = this.getImageIndexFromPhotos();
        delete this.photos[index];
        this.notifyMessage.success('Foto apagada com sucesso!');
    }

}
