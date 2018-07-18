import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../../../model";
import {AuthService} from "../../../services/auth.service";
import {ModalComponent} from "../../bootstrap/modal/modal.component";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public credentials = {
        email: 'admin@user.com',
        password: 'secret'
    };

    public showMessageError: boolean = false;

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit() {

    }

    submit() {
        this.authService.login(this.credentials)
            .subscribe(() => {
                this.router.navigate(['categories/list']);
            }, error => {
                this.showMessageError = true;
            })
        return false;
    }
}
