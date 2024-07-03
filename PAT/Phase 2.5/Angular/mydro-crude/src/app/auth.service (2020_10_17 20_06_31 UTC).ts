import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { User } from './interfaces/Users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _loginUrl = 'http://localhost:3000/api/login';
  private _passwordUrl = 'http://localhost:3000/api/password';
  private _mobileLoginUrl = 'http://localhost:3000/api/mobile/login';
  private _user: User;

  constructor(private http: HttpClient, private router: Router) {}

  login(user: User) {
    return this.http.post<any>(this._loginUrl, user).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        this._user = res.user;
        localStorage.setItem('user', JSON.stringify(this._user));
        while (!this.isLoggedIn) {}
        this.router.navigate(['home']);
      })
    );
  }
  mobileLogin(adminNo: number) {
    return this.http
      .post<any>(this._mobileLoginUrl, { adminNo: adminNo })
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.token);
          console.log(res.user);
          this._user = res.user;
          localStorage.setItem('user', JSON.stringify(this._user));
          while (!this.isLoggedIn) {}
          this.router.navigate(['home']);
        })
      );
  }

  changePassword(oldPass, newPass) {
    return this.http
      .post(this._passwordUrl, { oldPass: oldPass, newPass: newPass })
      .pipe(
        tap(() => {
          this.router.navigate(['home']);
        })
      );
  }

  fetchDetails() {
    try {
      this._user = JSON.parse(localStorage.getItem('user'));
    } catch (e) {
      this.logout();
    }
  }
  logout() {
    this._user = null;
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  get hasDetails(): boolean {
    return !!this._user;
  }

  get token() {
    return localStorage.getItem('token');
  }

  get rights() {
    try {
      return this._user.rights;
    } catch (e) {
      setTimeout(() => {
        return this._user.rights;
      }, 1000);
    }
  }

  get userID() {
    return this._user.id;
  }
}
