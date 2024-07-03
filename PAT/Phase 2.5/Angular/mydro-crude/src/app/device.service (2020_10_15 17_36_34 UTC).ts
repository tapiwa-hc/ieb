import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  constructor() {}

  get web() {
    return !navigator.userAgent.match(/iPhone|iPad|iPod|Android/i);
  }
  get mobile() {
    return !!navigator.userAgent.match(/iPhone|iPad|iPod|Android/i);
  }
}
