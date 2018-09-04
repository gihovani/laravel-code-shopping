import {Component, OnInit} from '@angular/core';
import userProfileFieldsOptions from "./user-profile-fields-options";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import userFieldsOptions from "../user/user-new-modal/user-fields-options";
import {NotifyMessageService} from "../../../services/notify-message.service";
import {UserProfileHttpService} from "../../../services/http/user-profile-http.service";
import {AuthService} from "../../../services/auth.service";

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
    public form: FormGroup;
    public errors: {};
    public has_photo: boolean;

    constructor(private userProfileHttp: UserProfileHttpService,
                private formBuilder: FormBuilder,
                private notifyMessage: NotifyMessageService,
                public authService: AuthService) {
        const maxLength = userFieldsOptions.name.validationMessage.maxLength;
        const minLength = userFieldsOptions.password.validationMessage.maxLength;
        this.form = this.formBuilder.group({
            name: ['', [Validators.maxLength(maxLength)]],
            email: ['', [Validators.email]],
            password: ['', [Validators.minLength(minLength)]],
            photo: false,
            phone_number: null,
            remove_photo: null
        });
    }

    ngOnInit() {
        this.form.patchValue(this.authService.me);
        this.form.get('phone_number').setValue(this.authService.me.profile.phone_number);
        this.setHasPhoto();
    }

    get fieldOptions() {
        return userProfileFieldsOptions;
    }

    get name() {
        return this.fieldOptions.name;
    }

    get email() {
        return this.fieldOptions.email;
    }

    get password() {
        return this.fieldOptions.password;
    }

    get photo() {
        return this.fieldOptions.photo;
    }

    get phone_number() {
        return this.fieldOptions.phone_number;
    }

    setHasPhoto() {
        this.has_photo = this.authService.me.profile.has_photo;
    }

    onChoosePhoto(files: FileList) {
        if (!files.length) {
            return;
        }

        this.form.get('photo').setValue(files[0]);
    }

    removePhoto() {
        this.form.get('remove_photo').setValue(1);
        this.has_photo = false;
        return false;
    }

    submit() {
        this.userProfileHttp.update(this.form.value).subscribe(() => {
            this.form.get('photo').setValue(false);
            this.notifyMessage.success('Perfil atualizado com sucesso!');
            this.errors = {};
            this.setHasPhoto();
        }, responseError => {
            if (responseError.status === 422) {
                this.errors = responseError.error.errors;
            }
        });
        return false;
    }
}
