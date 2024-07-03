import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from '../interfaces/Users';
import { NoticeService } from '../notice.service';

@Injectable({
  providedIn: 'root',
})
export class StudentsResolverService implements Resolve<Student[]> {
  constructor(private ns: NoticeService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Student[]> {
    return this.ns.getStudents();
  }
}
