import {Component, OnInit} from '@angular/core';
import pace from 'pace';
import {AuthService} from "./services/auth.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Code Shopping';

    constructor(public authService: AuthService) {
    }
    ngOnInit() {
        pace.start({
            document: false
        });
    }

    canShowNavBar() {
        return this.authService.isAuth();
    }
}
