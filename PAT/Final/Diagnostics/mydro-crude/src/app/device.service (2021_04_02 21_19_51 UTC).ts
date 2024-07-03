import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  constructor() {}

  /*
   * Returns a boolean of whether the visitor is a web user, based on the browser’s navigator.userAgent
   */
  get web(): boolean {
    return !navigator.userAgent.match(/iPhone|iPad|iPod|Android/i);
  }
  /*
   * Returns a boolean of whether the visitor is a web user, based on the browser’s navigator.userAgent
   */
  get mobile(): boolean {
    return !!navigator.userAgent.match(/iPhone|iPad|iPod|Android/i);
  }
}
