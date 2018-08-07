import {ElementRef, Injectable} from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {environment} from "../../../../../environments/environment";
import {AbstractControl} from "@angular/forms";

declare const $;

@Injectable({
    providedIn: 'root'
})
export class ProductIdFieldService {
    public data;
    public options: Select2Options;
    public select2Element: ElementRef;
    public formControl: AbstractControl;

    constructor(private authService: AuthService) {
    }

    get divModal() {
        const modalElement = this.select2Native.closest('modal');
        return modalElement.firstChild;
    }

    get select2Native(): HTMLElement {
        return this.select2Element.nativeElement;
    }

    make(select2Element: ElementRef, formControl: AbstractControl) {
        this.select2Element = select2Element;
        this.formControl = formControl;
        this.options = {
            minimumInputLength: 1,
            dropdownParent: $(this.divModal),
            theme: 'bootstrap4',
            ajax: {
                headers: {
                    'Authorization': this.authService.authorizationHeader
                },
                url: `${environment.api.url}/products`,
                data(params) {
                    return {
                        search: params.term,
                        all: 1
                    }
                },
                processResults(data) {
                    return {
                        results: data.data.map((product) => {
                            return {id: product.id, text: product.name};
                        })
                    }
                }
            }
        };
        this.data = [];
        this.onClosingDropDown();
        this.resetSelect2OnSetNull();
    }

    private getJQueryElement() {
        return $(this.select2Native);
    }

    private resetSelect2OnSetNull() {
        this.formControl.valueChanges.subscribe((value) => {
            if (!value) {
                const selectField = this.getJQueryElement().find('select');
                selectField.val(null).trigger('change');
            }
        });
    }

    private onClosingDropDown() {
        this.getJQueryElement().on('select2:closing', (e: Event) => {
            const element: HTMLInputElement = (<any>e.target);
            this.formControl.markAsTouched();
            this.formControl.setValue(element.value);
        });
    }

    updateFormControl(value) {
        this.formControl.setValue(value);
    }
}