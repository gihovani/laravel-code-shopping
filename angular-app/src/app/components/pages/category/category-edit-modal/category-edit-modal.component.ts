import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {CategoryHttpService} from "../../../../services/http/category-http.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'category-edit-modal',
  templateUrl: './category-edit-modal.component.html',
  styleUrls: ['./category-edit-modal.component.css']
})
export class CategoryEditModalComponent implements OnInit {
    private _categoryId:number;
    public form: FormGroup;
    @ViewChild(ModalComponent)
    public modal: ModalComponent;

    @Output()
    public onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output()
    public onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    constructor(private categoryHttp: CategoryHttpService, private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            id: 0,
            name: '',
            active: false
        });
    }

    ngOnInit() {
    }

    @Input()
    set categoryId(value) {
        if (!value) return;

        this._categoryId = value;
        this.categoryHttp.get(value).subscribe(response => {
            this.form.patchValue(response);
        });
    }

    submit() {
        this.categoryHttp.update(this._categoryId, this.form.value).subscribe((category) => {
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
