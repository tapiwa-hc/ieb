import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { NoticeService } from '../notice.service';
import { SectionInfo } from '../interfaces/Section';

@Injectable({
  providedIn: 'root'
})
export class SectionsResolverService implements Resolve<SectionInfo[]>{

  constructor(private ns: NoticeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SectionInfo[]> {
    return this.ns.getSections()
  }
}
