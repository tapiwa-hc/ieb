import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class BaseGuard implements CanActivate {
  protected requiredRights: number;

  /*
   * @params {@Injectable} Dependencies to inject
   */
  constructor(
    protected auth: AuthService,
    protected router: Router,
    protected snackBar: MatSnackBar
  ) {}

  /*
   * Returns a boolean of whether a user has permission to activate a requested route.
      If true, navigation continues. 
      If false, navigation is cancelled.
   */
  canActivate(): boolean {
    if (this.auth.rights >= this.requiredRights) {
      return true;
    }
    this.snackBar.open('You do not have access to this page', undefined, {
      duration: 2000,
    });
    this.router.navigate(['/home']);
    return false;
  }
}
