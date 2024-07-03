import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { PendingNotice } from '../interfaces/Notices';
import { NoticeService } from '../notice.service';

@Injectable({
  providedIn: 'root',
})
export class PendingResolverService implements Resolve<PendingNotice[]> {
  constructor(private ns: NoticeService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<PendingNotice[]> {
    return this.ns.getPending();
  }
}
