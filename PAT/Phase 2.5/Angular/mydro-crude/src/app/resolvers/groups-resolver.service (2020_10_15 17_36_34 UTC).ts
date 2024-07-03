import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { GroupList } from '../interfaces/Groups';
import { NoticeService } from '../notice.service';

@Injectable({
  providedIn: 'root',
})
export class GroupsResolverService implements Resolve<GroupList[]> {
  constructor(private ns: NoticeService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<GroupList[]> {
    return this.ns.getGroups();
  }
}
