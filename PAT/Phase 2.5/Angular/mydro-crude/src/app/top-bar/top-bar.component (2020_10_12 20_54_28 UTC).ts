import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  @Input() title: string;
  web: boolean;
  mobile: boolean;

  constructor(private authService: AuthService, private route: ActivatedRoute, private device: DeviceService) { }

  ngOnInit(): void {
    this.web = this.device.web;
    this.mobile = this.device.mobile;

  }

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  logout() {
    this.authService.logout();
  }
}
