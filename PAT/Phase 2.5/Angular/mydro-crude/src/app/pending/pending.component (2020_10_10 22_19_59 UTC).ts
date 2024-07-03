import { Component, OnInit } from '@angular/core';
import { PendingNotice } from '../interfaces/Notices';
import { NoticeService } from '../notice.service';
import { Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {
  pendingNotices: PendingNotice[];
  idsForApproval: number[] = [];
  idsForDenial: number[] = [];
  savePing: Subject<any> = new Subject();

  constructor(private noticeService: NoticeService,
    private router: Router) { }

  getPending(): void {
    this.noticeService.getPending()
      .subscribe(res => this.pendingNotices = res);
  }
  markForApproval(id) {
    this.idsForApproval.push(id);
    this.idsForDenial = this.idsForDenial.filter(dID => dID !== id);
  }
  markForDenial(id) {
    this.idsForDenial.push(id);
    this.idsForApproval = this.idsForApproval.filter(dID => dID !== id);
  }
  private updateList() {
    this.pendingNotices = this.pendingNotices.filter(notice => !(this.idsForApproval.includes(notice.id) || this.idsForDenial.includes(notice.id)));
    this.idsForApproval.forEach(id =>
      this.noticeService.updatePendingStatus(id, 3)
        .subscribe()
    );
    this.idsForDenial.forEach(id =>
      this.noticeService.updatePendingStatus(id, 2)
        .subscribe()
    );
  }
  async saveChanges() {
    await this.savePing.next('');
    this.updateList();
  }
  ngOnInit(): void {
    this.getPending();
  }

}
