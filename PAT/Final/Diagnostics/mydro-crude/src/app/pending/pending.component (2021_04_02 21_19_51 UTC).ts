import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PendingNotice } from '../interfaces/Notices';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['../table/table.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PendingComponent extends TableComponent implements OnInit {
  pendingNotices: PendingNotice[];
  idsForApproval: number[] = [];
  idsForDenial: number[] = [];

  // assign resolved PendingNotice[] data to pendingNotices
  getPending(): void {
    this.route.data.subscribe((data: { pendingNotices: PendingNotice[] }) => {
      this.pendingNotices = data.pendingNotices;
    });
  }

  // add notice id to idsForApproval
  markForApproval(id) {
    this.idsForApproval.push(id);
    this.idsForDenial = this.idsForDenial.filter((dID) => dID !== id);
  }
  // add notice id to idsForDenial
  markForDenial(id) {
    this.idsForDenial.push(id);
    this.idsForApproval = this.idsForApproval.filter((dID) => dID !== id);
  }

  // remove approved or denied notices from list
  private updateList() {
    this.pendingNotices = this.pendingNotices.filter(
      (notice) =>
        !(
          this.idsForApproval.includes(notice.id) ||
          this.idsForDenial.includes(notice.id)
        )
    );
    this.idsForApproval.forEach((id) =>
      this.noticeService.updatePendingStatus(id, 3).subscribe(
        () => {},
        () => {
          this.warn('Failed to apply approval/denial');
        }
      )
    );
    this.idsForDenial.forEach((id) =>
      this.noticeService.updatePendingStatus(id, 2).subscribe(
        () => {},
        () => {
          this.warn('Failed to apply approval/denial');
        }
      )
    );
  }

  // send an effective ping through the savePing subject to subscribers
  async saveChanges() {
    await this.savePing.next('');
    this.updateList();
  }

  ngOnInit(): void {
    this.getPending();
  }
}
