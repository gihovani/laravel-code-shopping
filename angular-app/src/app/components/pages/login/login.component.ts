import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public credentials = {
    email: '',
    password: ''
  };

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  submit() {
    console.log(this.credentials);
    this.http.post('http://localhost:8000/api/login', this.credentials)
      .subscribe((response:any) => {
        alert(response.token);
      });
  }
}
