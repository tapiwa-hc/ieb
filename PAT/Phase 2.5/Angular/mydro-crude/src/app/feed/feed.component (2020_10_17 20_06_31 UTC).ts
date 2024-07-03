import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { zip } from 'rxjs';
import { AuthService } from '../auth.service';
import { DeviceService } from '../device.service';
import { NoticeGroup as Subs } from '../interfaces/Groups';
import { Feed } from '../interfaces/Notices';
import { SectionInfo } from '../interfaces/Section';
import { NoticeService } from '../notice.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  userID;
  sectionInfo: SectionInfo[];
  feed: Feed[];
  filteredFeed: Feed[];
  subs: Subs[];
  otherGroups: Subs[];
  subCount: number;
  editableSubs = false;
  subsFilter: number[] = [];
  subsToRemove: number[] = [];
  subsToAdd: number[] = [];
  web: boolean;
  sbOpen = false;
  navHeight;

  @ViewChild('dateFrom') dateFrom: NgModel;
  @ViewChild('dateTill') dateTill: NgModel;

  constructor(
    private noticeService: NoticeService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private device: DeviceService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.web = this.device.web;
    this.userID = this.authService.userID;
    this.getSubs();
    this.setNavPosition();
    this.getSectionInfo();
    this.getFeed();
    setTimeout(() => {
      console.log(this.dateFrom);
      console.log(this.dateTill);
    }, 2000);
  }
  private getSectionInfo() {
    this.route.data.subscribe((data: { sectionInfo: SectionInfo[] }) => {
      this.sectionInfo = data.sectionInfo;
    });
  }
  private getFeed() {
    this.route.data.subscribe((data: { feed: Feed[] }) => {
      this.feed = [...data.feed];
      this.filteredFeed = [...data.feed];
    });
  }
  private getSubs() {
    this.route.data.subscribe((data: { subs: Subs[] }) => {
      this.subCount = data.subs.shift().id;
      this.subs = data.subs.slice(0, this.subCount);
      this.subs.sort(this.compareGroups);
      this.otherGroups = data.subs.slice(this.subCount);
      this.otherGroups.sort(this.compareGroups);
    });
  }

  private compareGroups(a: Subs, b: Subs) {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  }
  private setNavPosition() {
    this.navHeight = document.getElementsByTagName(
      'app-top-bar'
    )[0].children[0].clientHeight;
    document.querySelector(
      'body'
    ).style.cssText = `--nav-ht: ${this.navHeight}px`;
  }
  onResize(event) {
    if (this.web) {
      this.setNavPosition();
    }
  }
  toggleSB() {
    if (this.sbOpen) {
      this.closeSB();
    } else {
      this.openSB();
    }
    this.sbOpen = !this.sbOpen;
  }
  openSB() {
    document.getElementById('mySidebar').style.left = '0';
    document.getElementById('mySidebar').style.boxShadow =
      '16px 0px 160px #000000';
  }
  closeSB() {
    document.getElementById('mySidebar').style.left = '-320px';
    document.getElementById('mySidebar').style.boxShadow = 'none';
    if (this.editableSubs) {
      setTimeout(() => {
        this.cancelSubEdit();
      }, 1000);
    }
  }
  filterFeed() {
    let dateFrom = new Date(this.dateFrom.value).getTime();
    let dateTill = new Date(this.dateTill.value).getTime();
    this.filteredFeed = JSON.parse(JSON.stringify(this.feed));
    if (dateFrom || dateTill || this.subsFilter) {
      this.filteredFeed.forEach((section) => {
        section.notices = section.notices.filter((n) => {
          let nDate = new Date(n.display_date).getTime();
          let out = true;
          out = dateFrom ? dateFrom <= nDate : out;
          out = dateTill ? out && dateTill >= nDate : out;
          out =
            this.subsFilter.length > 0
              ? out && this.subsFilter.includes(n.grouping_id)
              : out;
          return out;
        });
      });
      this.filteredFeed = this.filteredFeed.filter(
        (section) => section.notices.length !== 0
      );
    }
    window.scrollTo(0, 0);
  }

  clearFilters() {
    this.dateFrom.reset();
    this.dateTill.reset();
    this.subsFilter = [];
    this.filterFeed();
  }

  editSubs() {
    this.editableSubs = true;
  }

  saveSubs() {
    this.editableSubs = false;

    let saveObserver = {
      next: () => location.reload(),
      error: () => {
        this.snackBar.open(
          'An error occurred. Please try again after a moment.',
          undefined,
          { duration: 5000 }
        );
      },
    };
    if (this.subsToAdd.length > 0 && this.subsToRemove.length > 0) {
      let add$ = this.noticeService.addSubs(
        this.userID,
        this.subsToAdd.toString()
      );
      let remove$ = this.noticeService.removeSubs(
        this.userID,
        this.subsToRemove.toString()
      );
      let save$ = zip(add$, remove$);
      save$.subscribe(saveObserver);
    } else if (this.subsToAdd.length > 0) {
      this.noticeService
        .addSubs(this.userID, this.subsToAdd.toString())
        .subscribe(saveObserver);
    } else if (this.subsToRemove.length > 0) {
      this.noticeService
        .removeSubs(this.userID, this.subsToRemove.toString())
        .subscribe(saveObserver);
    }
  }

  updateUnsub(e: MatCheckboxChange, id: number) {
    if (!e.checked) {
      this.subsToRemove.push(id);
    } else {
      this.subsToRemove = this.subsToRemove.filter((i) => i != id);
    }
  }
  updateSub(e: MatCheckboxChange, id: number) {
    if (e.checked) {
      this.subsToAdd.push(id);
    } else {
      this.subsToAdd = this.subsToAdd.filter((i) => i != id);
    }
  }
  cancelSubEdit() {
    this.editableSubs = false;
    this.subsToAdd = [];
    this.subsToRemove = [];
  }
}
