/*
 * Adapted from https://stackoverflow.com/a/55237905/13645562
 */

import { Directive, OnInit } from '@angular/core';
import { MatInput } from '@angular/material/input';

@Directive({
  selector: '[appAutofocus]',
})
export class AutofocusDirective implements OnInit {
  constructor(private matInput: MatInput) {}

  ngOnInit() {
    console.log('wtf');
    setTimeout(() => this.matInput.focus(), 1000);
  }
}