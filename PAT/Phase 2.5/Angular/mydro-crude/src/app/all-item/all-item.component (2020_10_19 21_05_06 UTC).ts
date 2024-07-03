import { Component, Input, OnInit } from '@angular/core';
import { AllNotice } from '../interfaces/Notices';
import { TableItemComponent } from '../table/table-item/table-item.component';

@Component({
  selector: '[app-all-item]',
  templateUrl: './all-item.component.html',
  styleUrls: ['../table/table-item/table-item.component.css'],
})
export class AllItemComponent extends TableItemComponent implements OnInit {
  @Input() notice: AllNotice;
  private _rights: number | string;
  editable: boolean;

  // Initialises _rights and editable
  init() {
    this._rights = this.auth.rights;
    this.editable =
      this._rights >= 3 ||
      (this._rights >= 2 && this.notice.userID == this.auth.userID);
  }

  get rights() {
    return this._rights;
  }
}
