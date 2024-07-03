import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AllNotice } from '../interfaces/Notices';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['../table/table.component.css'],
})
export class AllComponent extends TableComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  allNotices: AllNotice[];

  ngOnInit(): void {
    this.getAll();
  }
  get rights() {
    return this.auth.rights;
  }

  // assigns data of notices to allNotices
  private getAll() {
    this.subscriptions.add(
      this.route.data.subscribe((data: { allNotices: AllNotice[] }) => {
        this.allNotices = data.allNotices;
      })
    );
  }

  // sends an effective ping through the savePing subject
  async saveChanges() {
    this.savePing.next('');
    if (this.rights <= 2) {
      this.router.navigate(['/all']);
    }
  }

  // unsubscribes from all Observables
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
