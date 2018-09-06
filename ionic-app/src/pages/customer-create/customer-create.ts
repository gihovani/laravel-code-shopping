import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, TextInput} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerHttpProvider} from "../../providers/http/customer-http";

/**
 * Generated class for the CustomerCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-customer-create',
    templateUrl: 'customer-create.html',
})
export class CustomerCreatePage {
    @ViewChild('inputFilePhoto')
    inputFilePhoto: TextInput;
    form: FormGroup;
    photoPreview: string;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private formBuilder: FormBuilder,
                private customerHttp: CustomerHttpProvider) {
        this.form = this.formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(255)]],
            email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
            photo: null
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CustomerCreatePage');
    }

    onChoosePhoto(files: FileList) {
        if (!files.length) {
            return;
        }

        const file = files[0];
        this.makePhotoPreview(file);
        this.form.get('photo').setValue(file);
    }

    submit() {
        this.customerHttp.create(this.form.value).subscribe(() => {
            console.log('cliente criado');
        });
        return false;
    }

    selectPhoto() {
        const nativeElement = this.inputFilePhoto.getElementRef().nativeElement;
        const inputFile = nativeElement.querySelector('input');
        inputFile.click();
    }

    cancelPhoto() {
        this.photoPreview = null;
        this.form.get('photo').setValue(null);
    }

    makePhotoPreview(file: File) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (event: ProgressEvent) => {
            const target = <any>event.target;
            this.photoPreview = target.result
        }
    }
}
