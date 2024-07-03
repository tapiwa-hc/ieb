import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PendingNotice } from '../interfaces/Notices';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['../table/table.component.css', './pending.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PendingComponent extends TableComponent implements OnInit {
  pendingNotices: PendingNotice[];
  idsForApproval: number[] = [];
  idsForDenial: number[] = [];

  getPending(): void {
    this.route.data.subscribe((data: { pendingNotices: PendingNotice[] }) => {
      this.pendingNotices = data.pendingNotices;
    });
  }
  markForApproval(id) {
    this.idsForApproval.push(id);
    this.idsForDenial = this.idsForDenial.filter((dID) => dID !== id);
  }
  markForDenial(id) {
    this.idsForDenial.push(id);
    this.idsForApproval = this.idsForApproval.filter((dID) => dID !== id);
  }
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
  async saveChanges() {
    await this.savePing.next('');
    this.updateList();
  }
  // warn(message: any) {
  //   let snackBarRef = this.snackBar.open(`${message}. Please try again.`, 'OK');

  //   snackBarRef.onAction().subscribe(() => {
  //     location.reload();
  //   });
  //   this.router.events.subscribe((e) => {
  //     if (e instanceof NavigationStart) {
  //       snackBarRef.dismiss();
  //     }
  //   });
  // }
  ngOnInit(): void {
    this.getPending();
  }
}
