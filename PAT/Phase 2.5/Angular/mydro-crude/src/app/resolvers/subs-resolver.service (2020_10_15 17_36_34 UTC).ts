import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { NoticeGroup } from '../interfaces/Groups';
import { NoticeService } from '../notice.service';

@Injectable({
  providedIn: 'root',
})
export class SubsResolverService implements Resolve<NoticeGroup[]> {
  constructor(
    private ns: NoticeService,
    private router: Router,
    private auth: AuthService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<NoticeGroup[]> {
    return this.ns.getSubs(this.auth.userID);
  }
}
