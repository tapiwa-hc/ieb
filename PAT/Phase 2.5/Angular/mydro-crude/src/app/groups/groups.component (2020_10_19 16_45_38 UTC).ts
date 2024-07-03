import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupList, NewGroup } from '../interfaces/Groups';
import { SectionInfo } from '../interfaces/Section';
import { NoticeService } from '../notice.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
})
export class GroupsComponent implements OnInit {
  sectionInfo: SectionInfo[];
  groupList: GroupList[];
  @ViewChild('newForm') newForm: NgForm;
  formModel = new NewGroup(null, '');
  formVisible = false;

  constructor(
    private noticeService: NoticeService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getSections();
    this.getGroups();
  }

  private getSections(): void {
    this.route.data.subscribe((data: { sectionInfo: SectionInfo[] }) => {
      this.sectionInfo = data.sectionInfo;
    });
  }
  private getGroups(): void {
    this.route.data.subscribe((data: { groupList: GroupList[] }) => {
      this.groupList = data.groupList;
    });
  }
  removeFromList(id) {
    this.groupList.forEach((section) => {
      section.groups = section.groups.filter((group) => group.id !== id);
    });
    this.groupList = this.groupList.filter(
      (section) => section.groups.length !== 0
    );
  }
  toggleFormVisibility() {
    this.formVisible = !this.formVisible;
  }

  clearForm() {
    this.newForm.reset();
  }
  onSubmit() {
    if (this.newForm.invalid) {
      return;
    }
    this.noticeService.addGroup(this.formModel).subscribe(
      (res) => {
        this.router.navigate(['/groups']).then(() => {
          this.clearForm();
          this.toggleFormVisibility();
        });
      },
      () => {
        let snackBarRef = this.snackBar.open(
          `Failed to add. Please try again.`,
          'OK',
          { duration: 5000 }
        );

        snackBarRef.onAction().subscribe(() => {
          location.reload();
        });
      }
    );
  }
}
