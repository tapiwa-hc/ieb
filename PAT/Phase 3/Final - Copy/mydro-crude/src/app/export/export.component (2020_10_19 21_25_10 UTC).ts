import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PrintList } from '../interfaces/Notices';
import { SectionInfo } from '../interfaces/Section';
import { NoticeService } from '../notice.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css'],
})
export class ExportComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  exportModel = {
    date: '2020-02-25',
    sections: [],
    today: false,
    all: false,
  };

  ready: boolean = false;

  sectionInfo: SectionInfo[];
  dailyNotices: PrintList[];

  @ViewChild('exportForm') form: NgForm;

  constructor(
    private noticeService: NoticeService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  // assigns resolved SectionInfo[] data to sectionInfo
  private getSectionInfo() {
    this.subscriptions.add(
      this.route.data.subscribe((data: { sectionInfo: SectionInfo[] }) => {
        this.sectionInfo = data.sectionInfo;
      })
    );
  }
  ngOnInit(): void {
    this.getSectionInfo();
  }

  // selects all sections
  selectAllSections() {
    this.exportModel.sections = [];
    this.sectionInfo.forEach((s) => {
      this.exportModel.sections.push(s.id);
    });
  }

  // sets date to current date
  today() {
    this.exportModel.date = new Date().toISOString().substr(0, 10);
  }

  // sends request to express server
  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.subscriptions.add(
      this.noticeService
        .exportToPDF(this.exportModel.date, this.exportModel.sections)
        .subscribe(
          (res) => {
            this.dailyNotices = res;
            this.ready = true;
          },
          () => {
            this.snackBar.open(
              'An error occurred. Please try again after a moment.',
              undefined,
              { duration: 5000 }
            );
          }
        )
    );
  }

  // unsubscribes from all Observables
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
