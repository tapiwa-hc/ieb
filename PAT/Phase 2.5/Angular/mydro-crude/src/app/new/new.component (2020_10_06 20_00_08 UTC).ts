import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { NoticeService } from '../notice.service';

import { Student } from '../interfaces/Users';
import { NewNotice } from '../interfaces/New';
import { GroupList, NoticeGroup } from '../interfaces/NoticeGroup';
import { SectionInfo } from '../interfaces/Section';

import * as Tagify from '@yaireo/tagify';
import { MatSelect } from '@angular/material/select';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit, AfterViewInit {

  userID: number = 6;

  removable: boolean = true;
  selectable: boolean = true;
  students: Student[];
  taggedStudents: Student[];
  tagify;
  specificGroup: boolean = true;
  sectionInfo: SectionInfo[];
  groupList: GroupList[];

  today: Date = new Date();

  formModel = new NewNotice(this.userID, null, null, null, null, null);
  // formModel = new NewNotice(this.userID, this.today.toISOString(), 1, "Yee", "eeY" );
  
  @ViewChild('tags') tags: ElementRef;
  @ViewChild('group') group: MatSelect;
  
  

  constructor(private noticeService: NoticeService) { }

  ngOnInit(): void {
    this.getSections();
    this.getGroups();
    this.getStudents();
  }
  async ngAfterViewInit(): Promise<void> {
    await this.delay(1000);
    var whitelistStudents = [];
    this.students.forEach(s => {
      whitelistStudents.push({
        value: s.firstname + " " + s.surname,
        id: s.id
      })
    });
    // console.log(whitelistStudents)
    try {
      // TODO: AJAX
      this.tagify = new Tagify(this.tags.nativeElement, {
        enforceWhitelist : true,
        delimiters       : null,
        whitelist        : whitelistStudents
         // callbacks        : {
        //     // add    : console.log,  // callback when adding a tag
        //     remove : console.log   // callback when removing a tag
        // }
      });
    } catch (e) {
      console.log(e);
    }
  }

  delay = ms => new Promise(res => setTimeout(res, ms));
  private getStudents() {
    this.noticeService.getStudents().subscribe(res => {
      this.students = res;
      this.taggedStudents = res.slice(0,2);
    });

  }
  private getSections(): void {
    this.noticeService.getSections()
      .subscribe(res => this.sectionInfo = res);
  }
  private getGroups(): void {
    this.noticeService.getGroups()
      .subscribe(res => this.groupList = res);
  }

  resetGroup() {
    this.formModel.gID = null;
  }
  submitForm() {
    this.formModel.description =  this.formModel.description?.trim();
    this.formModel.title =  this.formModel.title?.trim();
    // console.log(this.group.value)
    let groupDetail: NoticeGroup = this.group.value;
    this.formModel.title = (this.formModel.title)? this.formModel.title : groupDetail.name;
    this.formModel.gID = this.specificGroup? groupDetail.id: this.formModel.gID;
    let dateDetail = new Date(this.formModel.date);
    this.formModel.date = dateDetail.toLocaleDateString("en-ZA");
    console.log(this.formModel.date);
    if (this.tags.nativeElement.value) {
      let tags: any[] = JSON.parse(this.tags.nativeElement.value);
      tags = tags.map(t => t.id);
      this.formModel.tags = tags.toString();
    }
    this.noticeService.newNotice(this.formModel).subscribe(res => this.formModel = new NewNotice(this.userID, null, null, null, null, null));
  }
  

}