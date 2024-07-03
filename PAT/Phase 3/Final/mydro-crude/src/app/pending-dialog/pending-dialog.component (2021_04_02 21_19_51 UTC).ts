import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
interface DialogData {
  message: string;
}
@Component({
  selector: 'app-pending-dialog',
  templateUrl: './pending-dialog.component.html',
})
export class PendingDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {}
}
