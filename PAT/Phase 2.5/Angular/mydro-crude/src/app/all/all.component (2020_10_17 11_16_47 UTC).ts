import { Component, OnInit } from '@angular/core';
import { AllNotice } from '../interfaces/Notices';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['../table/table.component.css', './all.component.css'],
})
export class AllComponent extends TableComponent implements OnInit {
  allNotices: AllNotice[];

  ngOnInit(): void {
    this.getAll();
  }
  get rights() {
    return this.auth.rights;
  }
  private getAll() {
    this.route.data.subscribe((data: { allNotices: AllNotice[] }) => {
      this.allNotices = data.allNotices;
    });
  }
  async saveChanges() {
    this.savePing.next('');
    if (this.rights <= 2) {
      this.router.navigate(['/all']);
    }
  }
  // warn(message: any) {
  //   let snackBarRef = this.snackBar.open(`${message}. Please try again.`, 'OK');

  //   snackBarRef.onAction().subscribe(() => {
  //     location.reload();
  //   });
  //   this.router.events.subscribe((e) => {
  //     if (e instanceof NavigationStart) {
  //       snackBarRef.dismiss();
  //     }
  //   });
  // }
}
