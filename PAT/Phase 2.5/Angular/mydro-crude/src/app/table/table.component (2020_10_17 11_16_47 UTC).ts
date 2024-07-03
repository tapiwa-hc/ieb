import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '../auth.service';
import { NoticeService } from '../notice.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  protected savePing: Subject<any> = new Subject();

  constructor(
    protected router: Router,
    protected snackBar: MatSnackBar,
    protected route: ActivatedRoute,
    protected auth: AuthService,
    protected noticeService: NoticeService
  ) {}

  ngOnInit(): void {}

  protected warn(message: any) {
    let snackBarRef = this.snackBar.open(`${message}. Please try again.`, 'OK');

    snackBarRef.onAction().subscribe(() => {
      location.reload();
    });
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        snackBarRef.dismiss();
      }
    });
  }
}
