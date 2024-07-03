import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { NoticeService } from '../notice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthDetailResolverService implements Resolve<number> {

  constructor(private ns: NoticeService, private auth: AuthService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<number> {
    if (this.auth.isLoggedIn && !this.auth.hasDetails) {
      return of(0)
    } else {
      return of(1)
    }
  }
  // Todo: delete
}
