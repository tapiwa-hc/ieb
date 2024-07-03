import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SectionInfo } from '../interfaces/Section';
import { NoticeService } from '../notice.service';

@Injectable({
  providedIn: 'root',
})
export class SectionsResolverService implements Resolve<SectionInfo[]> {
  constructor(private ns: NoticeService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<SectionInfo[]> {
    return this.ns.getSections();
  }
}
