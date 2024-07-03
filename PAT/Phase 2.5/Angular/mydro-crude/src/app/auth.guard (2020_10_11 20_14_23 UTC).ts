import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
    ) {}
  canActivate(): boolean {
    
    // console.log("guarding")

    if (!this.authService.hasDetails) {
      if (!this.authService.isLoggedIn) {
        let snackBarRef = this.snackBar.open("Please login to continue", "LOGIN", {duration: 5000});
        snackBarRef.onAction().subscribe(() => {
          this.router.navigate(['/login']);
        })
        return false;
      } 
      this.authService.fetchDetails()
      return true;
      // .subscribe(res => {
      //   return true
      // })
    }
    
    // else
    // if (this.authService.isLoggedIn && !this.authService.hasDetails) {
    //   this.authService.fetchDetails().subscribe(res => {
    //     if (res) {
    //       return true
    //     } 
    //     return false
    //   })
      
    // } 
    else {
      return true;
    }
  }
    
}

// TODO: ng config -g cli.warnings.versionMismatch true