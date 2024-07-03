import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { BaseGuard } from './base.guard';

@Injectable({
  providedIn: 'root',
})
export class PupilGuard extends BaseGuard implements CanActivate {
  requiredRights = 1;
}
