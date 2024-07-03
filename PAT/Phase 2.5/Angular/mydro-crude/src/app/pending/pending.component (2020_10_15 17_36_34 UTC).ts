import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { PendingNotice } from '../interfaces/Notices';
import { NoticeService } from '../notice.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PendingComponent implements OnInit {
  pendingNotices: PendingNotice[];
  idsForApproval: number[] = [];
  idsForDenial: number[] = [];
  savePing: Subject<any> = new Subject();
  dataSource;

  displayedColumns: string[] = [
    'display_date',
    'grouping_name',
    'title',
    'description',
    'user',
    'approve',
  ];

  constructor(
    private noticeService: NoticeService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  getPending(): void {
    this.route.data.subscribe((data: { pendingNotices: PendingNotice[] }) => {
      this.pendingNotices = data.pendingNotices;
      this.dataSource = new MatTableDataSource(this.pendingNotices);
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
  warn(message: any) {
    let snackBarRef = this.snackBar.open(`${message}. Please try again.`, 'OK');

    snackBarRef.onAction().subscribe(() => {
      location.reload();
    });
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        snackBarRef.dismiss();
      }
    });
  }
  ngOnInit(): void {
    this.getPending();
  }
}
