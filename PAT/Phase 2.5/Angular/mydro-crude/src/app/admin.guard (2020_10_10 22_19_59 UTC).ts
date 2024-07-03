import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
    ) {}

  canActivate(): boolean {
    if (!this.authService.isLoggedIn) {
      let snackBarRef = this.snackBar.open("Please login to continue", "LOGIN", {duration: 5000});
      snackBarRef.onAction().subscribe(() => {
        this.router.navigate(['/login']);
      })
      return false;
    }

    if (this.authService.rights >= 3) {
      return true;
    }
    this.snackBar.open("You do not have access to this page", undefined, {duration: 2000});
    this.router.navigate(['/home']);
    return false;
  }
  
}
