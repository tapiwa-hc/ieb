import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { AllNotice, PendingNotice } from 'src/app/interfaces/Notices';
import { NoticeService } from 'src/app/notice.service';

@Component({
  selector: 'app-table-item',
  templateUrl: './table-item.component.html',
  styleUrls: ['./table-item.component.css'],
})
export class TableItemComponent implements OnInit {
  notice: AllNotice | PendingNotice;
  @Input() savePing: Subject<any>;
  @Output() error = new EventEmitter<any>();
  @ViewChild('title') title: NgModel;
  @ViewChild('descr') descr: NgModel;

  editableTitle: boolean = false;
  editableDescr: boolean = false;
  protected initial: string[];
  protected edits: string[];

  constructor(
    protected noticeService: NoticeService,
    protected auth: AuthService
  ) {}

  ngOnInit(): void {
    this.initial = [this.notice.title, this.notice.description];
    this.edits = [this.notice.title, this.notice.description];
    this.savePing.subscribe((ping) => {
      this.saveEdits();
    });
    this.init();
  }

  protected init() {}

  allowTitleEdits() {
    this.editableTitle = true;
  }
  allowDescrEdits() {
    this.editableDescr = true;
  }
  keepTitle() {
    if (this.title.invalid) {
      this.discardTitle();
      return;
    }
    this.edits[0] = this.notice.title.trim();
    this.editableTitle = false;
  }
  discardTitle() {
    this.notice.title = this.edits[0].trim();
    this.editableTitle = false;
  }
  keepDescr() {
    if (this.descr.invalid) {
      this.discardDescr();
      return;
    }
    this.edits[1] = this.notice.description.trim();
    this.editableDescr = false;
  }
  discardDescr() {
    this.notice.description = this.edits[1].trim();
    this.editableDescr = false;
  }
  protected saveEdits() {
    if (
      this.initial[0] !== this.edits[0] ||
      this.initial[1] !== this.edits[1]
    ) {
      // console.log(`${this.notice.id}: I have changed`);
      this.noticeService
        .editNotice(this.notice.id, this.notice.title, this.notice.description)
        .subscribe(
          () => {},
          (err) => this.error.emit('Failed to save edits')
        );
      this.initial = [...this.edits];
    }
  }
}
