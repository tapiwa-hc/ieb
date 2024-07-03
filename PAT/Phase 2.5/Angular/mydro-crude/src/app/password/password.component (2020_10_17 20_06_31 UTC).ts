import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PasswordValidator } from '../shared/password.validator';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
})
export class PasswordComponent implements OnInit {
  minPw = 8;
  formGroup: FormGroup;
  invalidCredentials = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group(
      {
        oldPassword: ['', [Validators.required]],
        newPassword: [
          '',
          [Validators.required, Validators.minLength(this.minPw)],
        ],
        confirmNewPassword: ['', [Validators.required]],
      },
      { validator: PasswordValidator }
    );
  }

  get oldPassword() {
    return this.formGroup.get('oldPassword');
  }
  get newPassword() {
    return this.formGroup.get('newPassword');
  }
  get confirmNewPassword() {
    return this.formGroup.get('confirmNewPassword');
  }

  onPasswordInput() {
    if (this.formGroup.hasError('misMatch'))
      this.confirmNewPassword.setErrors([{ misMatch: true }]);
    else this.confirmNewPassword.setErrors(null);
  }
  onSubmit() {
    if (this.formGroup.valid) {
      this.authService
        .changePassword(this.oldPassword.value, this.newPassword.value)
        .subscribe(
          () => {
            let snackBarRef = this.snackBar.open(
              'Password changed successfully',
              undefined,
              { duration: 2000 }
            );
            snackBarRef.afterDismissed().subscribe(() => {
              this.router.navigate(['/home']);
            });
          },
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
}
