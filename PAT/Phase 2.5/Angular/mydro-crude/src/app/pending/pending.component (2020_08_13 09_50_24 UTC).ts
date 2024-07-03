import { Component, OnInit } from '@angular/core';
import { PendingNotice } from '../interfaces/PendingNotice';
import { NoticeService } from '../notice.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {
  pendingNotices: PendingNotice[];
  idsForApproval: number[] = [];
  idsForDenial: number[] = [];

  constructor(private noticeService: NoticeService) { }

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
  saveChanges() {
    this.updateList();
  }
  ngOnInit(): void {
    this.getPending();
  }

}
