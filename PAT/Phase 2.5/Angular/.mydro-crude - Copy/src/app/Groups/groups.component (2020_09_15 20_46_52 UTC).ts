import { Component, OnInit } from '@angular/core';
import { NoticeService } from '../notice.service';
import { SectionInfo } from '../interfaces/Section';
import { GroupList, NewGroup } from '../interfaces/NoticeGroup';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  sectionInfo: SectionInfo[];
  groupList: GroupList[];
  formModel = new NewGroup(0, "");
  sectionHasError = true;
  formVisible = false;

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
  removeFromList(id) {
    this.groupList.forEach(section => {
      section.groups = section.groups.filter(group => group.id !== id);
    });
    this.groupList = this.groupList.filter(section => section.groups.length !== 0);
    // this.getGroups();
  }
  toggleFormVisibility() {
    this.formVisible = !this.formVisible;
  }
  validateSection(value: any) {
    this.sectionHasError = value === "0";
  }

  clearForm() {
    this.formModel = new NewGroup(null, "");
  }
  onSubmit() {
    this.noticeService.addGroup(this.formModel).subscribe( res => {
      this.getGroups();
      this.clearForm();
      this.toggleFormVisibility();
    });
  }

}
