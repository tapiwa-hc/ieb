import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../interfaces/Users';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formModel = new User("", "");
  invalidCredentials: boolean = false;

  @ViewChild('loginForm') lf : NgForm;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.login(this.formModel).subscribe(
      res => {
        // console.log(res)
        // sessionStorage.setItem('token', res.token)
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.invalidCredentials = true;
            setTimeout(() => {
              this.invalidCredentials = false
            }, 3000)
          }
        }
      })
  }
}
