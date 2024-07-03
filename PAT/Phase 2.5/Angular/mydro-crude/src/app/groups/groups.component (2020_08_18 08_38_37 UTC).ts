import { Component, OnInit } from '@angular/core';
import { NoticeService } from '../notice.service';
import { SectionInfo } from '../interfaces/Section';
import { Section } from '../interfaces/NoticeGroup';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  sectionInfo: SectionInfo[];
  sections: Section[];
  

  constructor(private noticeService: NoticeService) { }

  ngOnInit(): void {
    this.getSections();
    this.getGroups();
    console.log(this.sectionInfo);
    console.log(this.sections);
  }

  private getSections(): void {
    this.noticeService.getSections()
      .subscribe(res => this.sectionInfo = res);
  }
  private getGroups(): void {
    this.noticeService.getGroups()
      .subscribe(res => this.sections = res);
  }

}
