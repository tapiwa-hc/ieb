import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Feed } from '../interfaces/Notices';
import { NoticeService } from '../notice.service';

@Injectable({
  providedIn: 'root',
})
export class FeedResolverService implements Resolve<Feed[]> {
  constructor(
    private ns: NoticeService,
    private router: Router,
    private auth: AuthService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Feed[]> {
    if (state.url.includes('mobile')) {
      return this.ns.getMyNoticesMobile();
    } else {
      return this.ns.getMyNotices(this.auth.userID);
    }
  }
}
