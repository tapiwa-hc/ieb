import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import * as Tagify from '@yaireo/tagify';
import { AuthService } from '../auth.service';
import { GroupList, NoticeGroup } from '../interfaces/Groups';
import { NewNotice } from '../interfaces/Notices';
import { SectionInfo } from '../interfaces/Section';
import { Student } from '../interfaces/Users';
import { NoticeService } from '../notice.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewComponent implements OnInit, AfterViewInit {
  private _rights: number | string;
  userID: number;

  removable: boolean = true;
  selectable: boolean = true;
  students: Student[];
  taggedStudents: Student[];
  tagify;
  specificGroup: boolean = true;
  sectionInfo: SectionInfo[];
  groupList: GroupList[];
  today: Date = new Date();

  get dateInPast() {
    return new Date(this.formModel.display_date) < this.today;
  }

  formModel: NewNotice;

  @ViewChild('newForm') newForm: NgForm;
  @ViewChild('tags') tags: ElementRef;
  @ViewChild('group') group: MatSelect;
  @ViewChild('date') date;

  constructor(
    private noticeService: NoticeService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  // initialise all members
  ngOnInit(): void {
    this.getSections();
    this.getGroups();
    this.getStudents();
    this.userID = this.auth.userID;
    this.formModel = new NewNotice(this.userID, null, null, null, null, null);
    this._rights = this.auth.rights;
  }

  // initialise Tagify
  ngAfterViewInit(): void {
    setTimeout(() => {
      var whitelistStudents = [];
      this.students.forEach((s) => {
        whitelistStudents.push({
          value: s.firstname + ' ' + s.surname,
          id: s.id,
        });
      });

      try {
        this.tagify = new Tagify(this.tags.nativeElement, {
          enforceWhitelist: true,
          delimiters: null,
          whitelist: whitelistStudents,
        });
      } catch (e) {
        console.log(e);
      }
    }, 1000);
  }

  get rights() {
    return this._rights;
  }

  // assign resolved Student[] data to students
  private getStudents() {
    this.route.data.subscribe((data: { students: Student[] }) => {
      this.students = data.students;
    });
  }
  // assign resolved SectionInfo[] data to sectionInfo
  private getSections(): void {
    this.route.data.subscribe((data: { sectionInfo: SectionInfo[] }) => {
      this.sectionInfo = data.sectionInfo;
    });
  }

  // assign resolved GroupList[] data to groupList
  private getGroups(): void {
    this.route.data.subscribe((data: { groupList: GroupList[] }) => {
      this.groupList = data.groupList;
    });
  }

  resetGroup() {
    this.formModel.gID = null;
  }

  // write new Notice to database
  submitForm() {
    if (this.newForm.invalid || this.dateInPast) {
      return;
    }
    this.formModel.description = this.formModel.description?.trim();
    this.formModel.title = this.formModel.title?.trim();

    let groupDetail: NoticeGroup = this.group.value;
    this.formModel.title = this.formModel.title
      ? this.formModel.title
      : groupDetail.name;
    this.formModel.gID = this.specificGroup
      ? groupDetail.id
      : this.formModel.gID;
    let dateDetail = new Date(this.formModel.display_date);
    this.formModel.display_date = dateDetail.toLocaleDateString('en-ZA');
    if (this.tags.nativeElement.value) {
      let tags: any[] = JSON.parse(this.tags.nativeElement.value);
      tags = tags.map((t) => t.id);
      this.formModel.tags = tags.toString();
    }
    this.noticeService.newNotice(this.formModel).subscribe(
      () => {
        this.newForm.resetForm({ specificGroup: true });
        this.formModel = new NewNotice(
          this.userID,
          null,
          null,
          null,
          null,
          null
        );
        this.snackBar.open('Submitted successfully', undefined, {
          duration: 2000,
        });
      },
      () => {
        this.snackBar.open(
          'An error occurred. Please try again after a moment.',
          undefined,
          { duration: 5000 }
        );
      }
    );
  }
}
