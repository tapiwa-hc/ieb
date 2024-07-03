import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NoticeService } from '../notice.service';
import { SectionInfo } from '../interfaces/Section';
import { printList, printNotice } from '../interfaces/pdf';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {

  exportModel = {
    date: "2020-02-25",//(new Date()).toISOString().substr(0, 10), 
    sections: [], 
    today: false, all: false
  };
  
  ready: boolean = false;

  sectionInfo: SectionInfo[];

  dailyNotices: printList[];

  constructor(private noticeService: NoticeService) { }


  private getSectionInfo() {
    this.noticeService.getSections().subscribe(res => this.sectionInfo = res);
    // this.sectionInfo = this.noticeService.sections;
  }
  ngOnInit(): void {
    this.getSectionInfo();
    // this.noticeService.exportToPDF("2020-02-25",[1,2,3,4,5,6]).subscribe( res => {
    //   this.dailyNotices = res;
    // }
    // )
  }

  selectAllSections() {
    this.exportModel.sections = [];
    this.sectionInfo.forEach(s => {
      this.exportModel.sections.push(s.id);
    })
  }
  today() {
    this.exportModel.date = (new Date()).toISOString().substr(0, 10);
  }

  onSubmit() {
    // console.log('yee');
    this.noticeService.exportToPDF(this.exportModel.date, this.exportModel.sections).subscribe(res => {
      this.dailyNotices = res
      this.ready = true
    });
  }
}
