import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {CategoryHttpService} from "../../../../services/http/category-http.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'category-new-modal',
    templateUrl: './category-new-modal.component.html',
    styleUrls: ['./category-new-modal.component.css']
})
export class CategoryNewModalComponent implements OnInit {
    public form: FormGroup;
    @ViewChild(ModalComponent)
    public modal: ModalComponent;

    @Output()
    public onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output()
    public onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    constructor(private categoryHttp: CategoryHttpService, private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            name: '',
            active: false
        });
    }

    ngOnInit() {
    }


    submit() {
        this.categoryHttp.create(this.form.value).subscribe(category => {
            this.form.reset({
                name: '',
                active: false
            });
            this.modal.hide();
            this.onSuccess.emit(category);
        }, error => this.onError.emit(error));
    }

    showModal() {
        this.modal.show();
    }

    hideModal($event: Event) {
        console.log($event);
    }
}
