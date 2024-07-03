import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { NoticeService } from '../notice.service';
import { GroupList } from '../interfaces/Groups';

@Injectable({
  providedIn: 'root'
})
export class GroupsResolverService implements Resolve<GroupList[]> {

  constructor(private ns: NoticeService, private router: Router) {}


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GroupList[]> {
    return this.ns.getGroups()
  }
}
