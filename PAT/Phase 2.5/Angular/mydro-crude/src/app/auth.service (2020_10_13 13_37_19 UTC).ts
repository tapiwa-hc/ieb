import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
// import * as jwt from 'jsonwebtoken';

import { User } from './interfaces/Users'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loginUrl = "http://localhost:3000/api/login";
  private _passwordUrl = "http://localhost:3000/api/password";
  private _mobileLoginUrl = "http://localhost:3000/api/mobile/login";
  private _detailsUrl = "http://localhost:3000/api/user";
  private _user: User;
  private _rights;
  private _userID;
  constructor(private http: HttpClient,
    private router: Router) {}

  login(user: User) {
    return this.http.post<any>(this._loginUrl, user).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        this._user = res.user;
        localStorage.setItem('user', JSON.stringify(this._user));
        while (!this.isLoggedIn) {}
        this.router.navigate(['home'])
      })
    )
    // Pipe;
  }
  mobileLogin(adminNo: number) {
    return this.http.post<any>(this._mobileLoginUrl, {adminNo: adminNo}).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        this._user = res.user;
        localStorage.setItem('user', JSON.stringify(this._user));
        while (!this.isLoggedIn) {}
        this.router.navigate(['home'])
      })
    )
  }

  changePassword(oldPass, newPass) {
    return this.http.post(this._passwordUrl, {oldPass: oldPass, newPass: newPass}).pipe(
      tap(res => {
        this.router.navigate(['home'])
      })
    )
  }
  // todo, invalid login

  fetchDetails() {
    // return this.http.get<any>(this._detailsUrl).pipe(
    //   tap(res => {
    //     this._user = res;
    //     // console.log(res)
    //   }, 
    //   err => {
    //     if (err instanceof HttpErrorResponse) {
    //       if (err.status === 401) {
    //         this.logout()
    //       }
    //     }
    //   })
    // )
    try {
      this._user = JSON.parse(localStorage.getItem('user'))
    } catch (e) {
      // this.logout()
      console.log("will logout")
    }
  }
  logout() {
    // this._userID = null;
    // this._rights = null;
    this._user = null;
    localStorage.clear()
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

    // let payload = jwt.verify(this.token, )
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
