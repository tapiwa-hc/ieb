import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/Users';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formModel = new User("", "");

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.login(this.formModel).subscribe(
      res => {
        console.log(res)
        // sessionStorage.setItem('token', res.token)
      },
      err => console.log(err))
  }
}
