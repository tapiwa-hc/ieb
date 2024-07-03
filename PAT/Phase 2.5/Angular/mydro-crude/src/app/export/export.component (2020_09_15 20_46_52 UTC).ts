import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NoticeService } from '../notice.service';
import { SectionInfo } from '../interfaces/Section';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {

  exportModel = {
    date: (new Date()).toISOString().substr(0, 10), 
    sections: [], 
    today: false, all: false
  };
  

  sectionInfo: SectionInfo[];

  constructor(private noticeService: NoticeService) { }


  private getSectionInfo() {
    this.noticeService.getSections().subscribe(res => this.sectionInfo = res);
  }
  ngOnInit(): void {
    this.getSectionInfo();
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
    console.log('yee');
    this.noticeService.exportToPDF(this.exportModel.date, this.exportModel.sections).subscribe(res => console.log(res));
  }
}
