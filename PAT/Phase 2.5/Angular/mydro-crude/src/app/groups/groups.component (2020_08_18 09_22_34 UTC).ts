import { Component, OnInit } from '@angular/core';
import { NoticeService } from '../notice.service';
import { SectionInfo } from '../interfaces/Section';
import { GroupList } from '../interfaces/NoticeGroup';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  sectionInfo: SectionInfo[];
  groupList: GroupList[];
  

  constructor(private noticeService: NoticeService) { }

  ngOnInit(): void {
    this.getSections();
    this.getGroups();
  }

  private getSections(): void {
    this.noticeService.getSections()
      .subscribe(res => this.sectionInfo = res);
  }
  private getGroups(): void {
    this.noticeService.getGroups()
      .subscribe(res => this.groupList = res);
  }

}
