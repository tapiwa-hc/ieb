import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { printList } from '../interfaces/Notices';
import { SectionInfo } from '../interfaces/Section';
import { NoticeService } from '../notice.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css'],
})
export class ExportComponent implements OnInit {
  exportModel = {
    date: '2020-02-25',
    sections: [],
    today: false,
    all: false,
  };

  ready: boolean = false;

  sectionInfo: SectionInfo[];

  dailyNotices: printList[];

  constructor(
    private noticeService: NoticeService,
    private route: ActivatedRoute
  ) {}

  private getSectionInfo() {
    this.route.data.subscribe((data: { sectionInfo: SectionInfo[] }) => {
      this.sectionInfo = data.sectionInfo;
    });
  }
  ngOnInit(): void {
    this.getSectionInfo();
  }

  selectAllSections() {
    this.exportModel.sections = [];
    this.sectionInfo.forEach((s) => {
      this.exportModel.sections.push(s.id);
    });
  }
  today() {
    this.exportModel.date = new Date().toISOString().substr(0, 10);
  }

  onSubmit() {
    this.noticeService
      .exportToPDF(this.exportModel.date, this.exportModel.sections)
      .subscribe((res) => {
        this.dailyNotices = res;
        this.ready = true;
      });
  }
}
