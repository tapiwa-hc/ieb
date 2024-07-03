import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class HelpService {
  constructor(private route: Router) {}

  getHelp() {
    let path = this.route.url;
    window.open(`/assets/help${path}/help.html`);
  }
}
