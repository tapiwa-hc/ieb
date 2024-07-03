import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { TabularNotice } from '../interfaces/Notices';
import { NoticeService } from '../notice.service';

@Injectable({
  providedIn: 'root'
})
export class AllTableResolverService implements Resolve<TabularNotice[]>{

  constructor(private ns: NoticeService, private router: Router) {}


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TabularNotice[]> {
    return this.ns.getAll()
  }
}
