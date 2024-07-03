import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import * as jwt from 'jsonwebtoken';

import { User } from './interfaces/Users'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loginUrl = "http://localhost:3000/api/login";
  private _user
  private _rights;
  private _userID;
  constructor(private http: HttpClient,
    private router: Router) {}

  login(user: User) {
    return this.http.post<any>(this._loginUrl, user).pipe(
      tap(res => {
        sessionStorage.setItem('token', res.token);
        let payload = jwt.verify(res.token, "placeholderKey");
        this._user = payload.subject;
        // this._rights = res.rights;
        // this._userID = res.id;
        // TODO: jwt tings
      })
    )
    // Pipe;
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
    return this._user.rights;
  }

  get userID() {
    return this._user.id;
  }
}
