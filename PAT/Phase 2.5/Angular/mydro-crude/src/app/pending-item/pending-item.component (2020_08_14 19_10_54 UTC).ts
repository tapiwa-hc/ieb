import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PendingNotice } from '../interfaces/PendingNotice';

@Component({
  selector: '[app-pending-item]',
  templateUrl: './pending-item.component.html',
  styleUrls: ['./pending-item.component.css']
})
export class PendingItemComponent implements OnInit {

  @Input() notice: PendingNotice;
  @Output() markedForApproval = new EventEmitter<number>();
  @Output() markedForDenial = new EventEmitter<number>();

  editableTitle: boolean = false;
  editableDescr: boolean = false;
  edits: string[];

  constructor() { }

  ngOnInit(): void {
    this.edits = [this.notice.title, this.notice.description];
  }
  markForApproval(id) {
    this.markedForApproval.emit(id);
  }
  markForDenial(id) {
    this.markedForDenial.emit(id);
  }
  allowTitleEdits() {
    this.editableTitle = true;
  }
  allowDescrEdits() {
    this.editableDescr = true;
  }
  keepTitle() {
    this.edits[0] = this.notice.title.trim();
    this.editableTitle = false;
  }
  discardTitle() {
    this.notice.title = this.edits[0].trim();
    this.editableTitle = false;
  }
  keepDescr() {
    this.edits[1] = this.notice.description.trim();
    this.editableDescr = false;
  }
  discardDescr() {
    this.notice.description = this.edits[1].trim();
    this.editableDescr = false;
  }
  // TODO: save edits to db
}
