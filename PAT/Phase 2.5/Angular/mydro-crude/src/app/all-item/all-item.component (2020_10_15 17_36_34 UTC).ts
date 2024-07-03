import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../auth.service';
import { TabularNotice } from '../interfaces/Notices';
import { NoticeService } from '../notice.service';

@Component({
  selector: '[app-all-item]',
  templateUrl: './all-item.component.html',
  styleUrls: ['./all-item.component.css'],
})
export class AllItemComponent implements OnInit {
  @Input() notice: TabularNotice;
  @Input() savePing: Subject<any>;

  editableTitle = false;
  editableDescr = false;
  initial: string[];
  edits: string[];
  private _rights: number | string;

  constructor(
    private noticeService: NoticeService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.initial = [this.notice.title, this.notice.description];
    this.edits = [this.notice.title, this.notice.description];
    this.savePing.subscribe((ping) => {
      this.saveEdits();
    });
    this._rights = this.auth.rights;
  }

  get rights() {
    return this._rights;
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
    if (
      this.initial[0] !== this.edits[0] ||
      this.initial[1] !== this.edits[1]
    ) {
      // console.log(`${this.notice.id}: I have changed`);
      this.noticeService
        .editNotice(this.notice.id, this.notice.title, this.notice.description)
        .subscribe();
      this.initial = [...this.edits];
    }
  }
}
