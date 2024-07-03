import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { NoticeService } from '../notice.service';
import { PendingNotice } from '../interfaces/Notices';

@Injectable({
  providedIn: 'root'
})
export class PendingResolverService implements Resolve<PendingNotice[]> {

  constructor(private ns: NoticeService, private router: Router) {}


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PendingNotice[]> {
    return this.ns.getPending()
  }
}
