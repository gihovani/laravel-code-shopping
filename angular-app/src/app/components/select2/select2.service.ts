import {ElementRef, Injectable} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AbstractControl} from "@angular/forms";

declare const $;

@Injectable({
    providedIn: 'root'
})
export class Select2Service {
    public data;
    public options: Select2Options;
    public select2Element: ElementRef;
    public formControl: AbstractControl;

    constructor(private authService: AuthService) {
    }

    get parent() {
        const modalElement = this.select2Native.closest('.select2-parent');
        return modalElement.firstChild;
    }

    get select2Native(): HTMLElement {
        return this.select2Element.nativeElement;
    }

    make(autocompleteUrl: string, select2Element: ElementRef, formControl: AbstractControl) {
        this.select2Element = select2Element;
        this.formControl = formControl;
        this.data = [];
        this.setOptions(autocompleteUrl);
        this.onClosingDropDown();
        this.resetSelect2OnSetNull();
    }

    private setOptions(autocompleteUrl: string) {
        const options = {
            minimumInputLength: 1,
            dropdownParent: $(this.parent),
            theme: 'bootstrap4',
            ajax: {
                url: autocompleteUrl,
                transport: (params, success, failure) => {
                    const headers = {
                        'Accept': 'application/json',
                        'Authorization': this.authService.authorizationHeader
                    };
                    return $.ajax({
                        headers: headers,
                        url: params.url,
                        data: params.data,
                        dataType: params.dataType,
                        success: success,
                        failure: failure
                    });
                },
                data(params) {
                    return {
                        search: params.term,
                        all: 1
                    }
                },
                processResults(data) {
                    return {
                        results: data.data.map((responseData) => {
                            return {id: responseData.id, text: responseData.name};
                        })
                    }
                }
            }
        };
        this.options = {...options, ...this.options};
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