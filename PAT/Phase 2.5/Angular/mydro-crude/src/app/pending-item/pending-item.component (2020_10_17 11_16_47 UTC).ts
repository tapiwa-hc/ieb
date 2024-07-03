import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PendingNotice } from '../interfaces/Notices';
import { TableItemComponent } from '../table/table-item/table-item.component';

@Component({
  selector: '[app-pending-item]',
  templateUrl: './pending-item.component.html',
  styleUrls: [
    '../table/table-item/table-item.component.css',
    './pending-item.component.css',
  ],
})
export class PendingItemComponent extends TableItemComponent implements OnInit {
  @Input() notice: PendingNotice;
  @Output() markedForApproval = new EventEmitter<number>();
  @Output() markedForDenial = new EventEmitter<number>();

  markForApproval(id) {
    this.markedForApproval.emit(id);
  }
  markForDenial(id) {
    this.markedForDenial.emit(id);
  }
}
