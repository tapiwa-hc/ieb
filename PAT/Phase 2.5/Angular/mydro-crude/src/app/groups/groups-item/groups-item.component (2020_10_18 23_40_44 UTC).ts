import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoticeGroup } from 'src/app/interfaces/Groups';
import { NoticeService } from 'src/app/notice.service';
import { GroupsDialogComponent } from '../groups-dialog/groups-dialog.component';

@Component({
  selector: '[app-groups-item]',
  templateUrl: './groups-item.component.html',
  styleUrls: ['./groups-item.component.css'],
})
export class GroupsItemComponent implements OnInit {
  @Input() group: NoticeGroup;
  @Output() deleted = new EventEmitter<number>();

  editable: boolean = false;
  initial: string;

  constructor(
    private noticeService: NoticeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}
  discardEdits(): void {
    this.group.name = (' ' + this.initial).slice(1);
    this.toggleEdits();
  }

  toggleEdits(): void {
    this.editable = !this.editable;
  }

  saveEdits(): void {
    this.toggleEdits();
    this.noticeService
      .setGroupName(this.group.id, this.group.name.trim())
      .subscribe(
        () => {
          this.initial = (' ' + this.group.name).slice(1);
        },
        () => {
          let snackBarRef = this.snackBar.open(
            `Failed to save. Please try again.`,
            'OK',
            { duration: 5000 }
          );

          snackBarRef.onAction().subscribe(() => {
            location.reload();
          });
        }
      );
  }

  delete(): void {
    this.noticeService.deleteGroup(this.group.id, false).subscribe(
      () => {
        this.emitDelete();
      },
      (err) => {
        let errorNum = err['error']['errno'];
        if (errorNum === 1451) {
          let dialogRef = this.dialog.open(GroupsDialogComponent);
          dialogRef.afterClosed().subscribe((yes) => {
            if (yes) {
              this.noticeService
                .deleteGroup(this.group.id, true)
                .subscribe(() => {
                  this.emitDelete();
                });
            }
          });
        }
      }
    );
  }

  emitDelete() {
    this.deleted.emit(this.group.id);
  }

  ngOnInit(): void {
    this.initial = (' ' + this.group.name).slice(1);
  }
}
