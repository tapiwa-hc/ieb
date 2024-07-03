import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './interfaces/Users'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loginUrl = "http://localhost:3000/api/login";

  constructor(private http: HttpClient,
    private router: Router) {}

  login(user: User) {
    return this.http.post<any>(this._loginUrl, user)
    // Pipe;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  get token() {
    return localStorage.getItem('token');
  }
}
