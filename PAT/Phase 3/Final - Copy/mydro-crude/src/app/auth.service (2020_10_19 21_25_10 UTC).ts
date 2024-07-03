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

  /*
   * Navigates to '/home'
   */
  private _loginObserver = {
    next: (res) => {
      localStorage.setItem('token', res.token);
      this._user = res.user;
      localStorage.setItem('user', JSON.stringify(this._user));
      while (!this.isLoggedIn) {}
      this.router.navigate(['home']);
    },
  };

  /*
   * @params {@Injectable} Dependencies to inject
   */
  constructor(private http: HttpClient, private router: Router) {}

  /*
   * Returns an RxJS Observable of the results of a POST request to '/login'
   * @param {User} [user] object with user's username and password
   * @returns {Observable<any>}
   */
  login(user: User) {
    return this.http
      .post<any>(this._loginUrl, user)
      .pipe(tap(this._loginObserver));
  }

  /*
   * Returns an RxJS Observable of the results of a POST request to '/mobile/login'
   * @param {number} [adminNo] student's admin number
   * @returns {Observable<any>}
   */
  mobileLogin(adminNo: number) {
    return this.http
      .post<any>(this._mobileLoginUrl, { adminNo: adminNo })
      .pipe(tap(this._loginObserver));
  }

  /*
   * Returns an RxJS Observable of the results of a POST request to '/mobile/login'
   * @param {any} [oldPass] user's old password to change
   * @param {any} [newPass] user's new desired password
   * @returns {Observable<any>}
   */
  changePassword(oldPass: any, newPass: any) {
    return this.http
      .post(this._passwordUrl, { oldPass: oldPass, newPass: newPass })
      .pipe(
        tap(() => {
          this.router.navigate(['home']);
        })
      );
  }

  /*
   * Attempts to assign an object of a user’s details to the _user property, otherwise logs user out
   */
  fetchDetails(): void {
    try {
      this._user = JSON.parse(localStorage.getItem('user'));
    } catch (e) {
      this.logout();
    }
  }

  /*
   * Resets locally stored user details and navigates to “Login”
   */
  logout(): void {
    this._user = null;
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  /*
   * Returns a boolean of whether a visitor is logged in
   */
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  /*
   * Returns a boolean of whether the _user property has been initialised
   */
  get hasDetails(): boolean {
    return !!this._user;
  }

  /*
   * Returns a string of the current user’s locally stored token
   */
  get token(): string {
    return localStorage.getItem('token');
  }

  /*
   * Returns the current user’s authorisation rights
   */
  get rights(): string | number {
    try {
      return this._user.rights;
    } catch (e) {
      setTimeout(() => {
        return this._user.rights;
      }, 1000);
    }
  }

  /*
   * Returns the current user’s id
   */
  get userID(): number {
    return this._user.id;
  }
}
