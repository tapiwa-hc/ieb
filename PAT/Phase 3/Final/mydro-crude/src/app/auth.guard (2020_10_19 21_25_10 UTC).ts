import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { BaseGuard } from './base.guard';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard extends BaseGuard implements CanActivate {
  /*
   * Returns a boolean of whether a user is logged in.
      If true, navigation continues. 
      If false, navigation is cancelled.
   */
  canActivate(): boolean {
    if (!this.auth.hasDetails) {
      if (!this.auth.isLoggedIn) {
        let snackBarRef = this.snackBar.open(
          'Please login to continue',
          'LOGIN',
          { duration: 5000 }
        );
        snackBarRef.onAction().subscribe(() => {
          this.router.navigate(['/login']);
        });
        return false;
      }
      this.auth.fetchDetails(); // if logged in but no details (typical after reload/revisit)
      return true;
    } else {
      return true;
    }
  }
}
