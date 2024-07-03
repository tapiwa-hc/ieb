import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../interfaces/Users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formModel = new User('', '');
  invalidCredentials: boolean = false;

  @ViewChild('loginForm') lf: NgForm;

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.formModel).subscribe(
      () => {},
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.invalidCredentials = true;
            setTimeout(() => {
              this.invalidCredentials = false;
            }, 3000);
          }
        }
      }
    );
  }
}
