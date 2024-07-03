import { Component, OnInit } from '@angular/core';
import { TabularNotice } from '../interfaces/Notices';
import { NoticeService } from '../notice.service';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  allNotices: TabularNotice[]
  savePing: Subject<any> = new Subject();

  constructor(private noticeService: NoticeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAll();
    // this.noticeService.getAll().subscribe(res => this.allNotices = res);
  }
  private getAll() {
    this.route.data
      .subscribe((data: {allNotices: TabularNotice[]}) => {
        this.allNotices = data.allNotices
      })
  }
  async saveChanges() {
    this.savePing.next('');
  }

}
