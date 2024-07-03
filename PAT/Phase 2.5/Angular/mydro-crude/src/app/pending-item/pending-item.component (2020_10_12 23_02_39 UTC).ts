import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, ViewChild } from '@angular/core';
import { PendingNotice } from '../interfaces/Notices';
import { Subject } from 'rxjs';
import { NoticeService } from '../notice.service';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  selector: '[app-pending-item]',
  templateUrl: './pending-item.component.html',
  styleUrls: ['./pending-item.component.css']
})
export class PendingItemComponent implements OnInit {

  @Input() notice: PendingNotice;
  @Input() savePing: Subject<any>;
  @Output() markedForApproval = new EventEmitter<number>();
  @Output() markedForDenial = new EventEmitter<number>();
  // @ViewChild('autosize') autosize: CdkTextareaAutosize;

  editableTitle: boolean = false;
  editableDescr: boolean = false;
  initial: string[];
  edits: string[];

  constructor(private noticeService: NoticeService) { }

  ngOnInit(): void {
    this.initial = [this.notice.title, this.notice.description];
    this.edits = [this.notice.title, this.notice.description];
    this.savePing.subscribe(ping => {
      this.saveEdits();
    });

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

  private saveEdits() {
    if (this.initial[0] !== this.edits[0] || this.initial[1] !== this.edits[1]) {
      // console.log(`${this.notice.id}: I have changed`);
      this.noticeService.editNotice(this.notice.id, this.notice.title, this.notice.description).subscribe();
      this.initial = [...this.edits];
    }
  }
  
}
