import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { NoticeService } from '../notice.service';

@Injectable({
  providedIn: 'root',
})
export class BaseResolverService {
  /*
   * @params {@Injectable} Dependencies to inject
   */
  constructor(
    protected ns: NoticeService,
    // protected router: Router,
    protected auth: AuthService
  ) {}
}
