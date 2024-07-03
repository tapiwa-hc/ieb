import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor() { 
  }

  get web() {
    return !navigator.userAgent.match(/iPhone|iPad|iPod|Android/i)
  }
  get mobile() {
    return !!navigator.userAgent.match(/iPhone|iPad|iPod|Android/i)
  }
}
