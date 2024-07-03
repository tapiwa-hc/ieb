
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MobileAuthService {

  private _loginUrl = "http://localhost:3000/api/mobile/login";
  private _user;
  constructor(private http: HttpClient, private router: Router) { }

  login(adminNo: number) {
    return this.http.post<any>(this._loginUrl, {adminNo: adminNo}).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        this._user = res.user;
        localStorage.setItem('user', JSON.stringify(this._user));
        while (!this.isLoggedIn) {}
        this.router.navigate(['home'])
      })
    )
  }
  logout() {
    this._user = null;
    localStorage.clear()
    this.router.navigate(['/login']);
  }
  fetchDetails() {
    try {
      this._user = JSON.parse(sessionStorage.getItem('user'))
    } catch (e) {
      console.log("will logout")
    }
  }
  // TODO: inherit auth
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  get userID() {
    return this._user.id;
  }
  get hasDetails(): boolean {
    return !!this._user;
  }
  get token() {
    return sessionStorage.getItem('token');
  }
}
