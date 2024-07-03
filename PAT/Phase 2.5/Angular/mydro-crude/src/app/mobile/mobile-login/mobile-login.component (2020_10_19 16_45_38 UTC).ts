import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-mobile-login',
  templateUrl: './mobile-login.component.html',
  styleUrls: ['./mobile-login.component.css'],
})
export class MobileLoginComponent implements OnInit {
  adminNo;
  invalidCredentials = false;
  @ViewChild('loginForm') lf: NgForm;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}
  onSubmit() {
    if (this.lf.invalid) {
      return;
    }
    this.auth.mobileLogin(this.adminNo).subscribe(
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
