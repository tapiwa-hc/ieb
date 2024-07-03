import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import { User } from './interfaces/Users'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loginUrl = "http://localhost:3000/api/login";
  private _detailsUrl = "http://localhost:3000/api/user";
  private _user: User;
  private _rights;
  private _userID;
  constructor(private http: HttpClient,
    private router: Router) {}

  login(user: User) {
    return this.http.post<any>(this._loginUrl, user).pipe(
      tap(res => {
        sessionStorage.setItem('token', res.token);
        this._user = res.user;
        while (!this.isLoggedIn) {}
        this.router.navigate(['home'])
      })
    )
    // Pipe;
  }
  // todo, invalid login

  fetchDetails() {
    return this.http.get<any>(this._detailsUrl).pipe(
      tap(res => {
        this._user = res;
      })
    )
  }
  logout() {
    // this._userID = null;
    // this._rights = null;
    this._user = null;
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  get isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  get token() {
    return sessionStorage.getItem('token');
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
