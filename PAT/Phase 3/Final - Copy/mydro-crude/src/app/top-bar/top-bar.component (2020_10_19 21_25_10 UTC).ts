import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DeviceService } from '../device.service';
import { HelpService } from '../help.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {
  @Input() title: string;
  web: boolean;
  mobile: boolean;

  constructor(
    private auth: AuthService,
    private device: DeviceService,
    private help: HelpService
  ) {}

  ngOnInit(): void {
    this.web = this.device.web;
    this.mobile = this.device.mobile;
  }

  get rights() {
    return this.auth.rights;
  }

  get isLoggedIn() {
    return this.auth.isLoggedIn;
  }

  getHelp() {
    this.help.getHelp();
  }

  logout() {
    this.auth.logout();
  }
}
