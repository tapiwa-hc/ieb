import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { DeviceService } from './device.service';

@Injectable({
  providedIn: 'root',
})
export class DeviceGuard implements CanActivate {
  constructor(private router: Router, private device: DeviceService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let isMobileRoute = state.url.includes('mobile');
    if (
      (this.device.mobile && isMobileRoute) ||
      (this.device.web && !isMobileRoute)
    ) {
      return true;
    } else if (this.device.web) {
      this.router.navigate([state.url.replace('mobile/', '')]);
    } else if (this.device.mobile) {
      if (state.url.includes('login')) {
        this.router.navigate(['/mobile/login']);
      } else {
        this.router.navigate(['/mobile/feed']);
      }
    }
    return false;
  }
}
