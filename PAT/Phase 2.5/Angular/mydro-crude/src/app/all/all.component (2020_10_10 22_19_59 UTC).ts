import { Component, OnInit } from '@angular/core';
import { TabularNotice } from '../interfaces/Notices';
import { NoticeService } from '../notice.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  allNotices: TabularNotice[]
  savePing: Subject<any> = new Subject();

  constructor(private noticeService: NoticeService) { }

  ngOnInit(): void {
    this.noticeService.getAll().subscribe(res => this.allNotices = res);
  }
  async saveChanges() {
    this.savePing.next('');
  }

}
