import { Component, OnInit, ViewChild } from '@angular/core';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-mobile-login',
  templateUrl: './mobile-login.component.html',
  styleUrls: ['./mobile-login.component.css']
})
export class MobileLoginComponent implements OnInit {

  adminNo;
  @ViewChild('loginForm') lf;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }
  onSubmit() {
    this.auth.mobileLogin(this.adminNo).subscribe()
  }
}
