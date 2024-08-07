import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { GroupList } from '../interfaces/Groups';
import { BaseResolverService } from './base-resolver.service';

@Injectable({
  providedIn: 'root',
})
export class GroupsResolverService
  extends BaseResolverService
  implements Resolve<GroupList[]> {
  /*
   * Returns an RxJS Observable from the NoticeService call and 
      waits for a next value before completing navigation 
   * @param {ActivatedRouteSnapshot} [route] "Contains the information about a route ... at a particular moment in time"
   * @param {RouterStateSnapshot} [state] "Represents the state of the router at a moment in time."
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<GroupList[]> {
    return this.ns.getGroups();
  }
}
