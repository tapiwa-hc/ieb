import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatListOption } from '@angular/material/list';
import { AuthService } from '../auth.service';
import { Feed, FeedNotice } from '../interfaces/Notices';
import { NoticeGroup as Subs } from '../interfaces/Groups';
import { SectionInfo } from '../interfaces/Section';
import { NoticeService } from '../notice.service';
import { DeviceService } from '../device.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
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

  @ViewChild('dateFrom') dateFrom: ElementRef;
  @ViewChild('dateTill') dateTill: ElementRef;

  constructor(private noticeService: NoticeService, private authService: AuthService, private route: ActivatedRoute, private device: DeviceService) { }

  ngOnInit(): void {
    this.web = this.device.web;
    if (this.web) {
      this.userID = this.authService.userID;
      this.getSubs();
      this.setNavPosition();
    }
    this.getSectionInfo();
    this.getFeed();
    
    // this.dateFrom.nativeElement.value = "2020-02-21";
  }
  private getSectionInfo() {
    this.route.data
      .subscribe((data: {sectionInfo: SectionInfo[]}) => {
        this.sectionInfo = data.sectionInfo
      })
    // this.noticeService.getSections().subscribe(res => this.sectionInfo = res);
  }
  private getFeed() {
    this.route.data
      .subscribe((data: {feed: Feed[]}) => {
        this.feed = [...data.feed]
        this.filteredFeed = [...data.feed]
      })
    // this.noticeService.getMyNotices(this.userID).subscribe(res => {
    //   this.feed = [...res];
    //   this.filteredFeed = [...res];
    // });
  }
  private getSubs() {
    this.route.data
      .subscribe((data: {subs: Subs[]}) => {
        this.subCount = data.subs.shift().id;
        this.subs = data.subs.slice(0,this.subCount);
        this.subs.sort(this.compareGroups);
        this.otherGroups = data.subs.slice(this.subCount + 1)
        this.otherGroups.sort(this.compareGroups);
      })
    // this.noticeService.getSubs(this.userID).subscribe(res => {
    //   this.subCount = res.shift().id;
    //   this.subs = res.slice(0,this.subCount);
    //   this.subs.sort(this.compareGroups);
    //   this.otherGroups = res.slice(this.subCount + 1)
    //   this.otherGroups.sort(this.compareGroups);
    // });
  }

  private compareGroups(a: Subs, b: Subs) {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  }
  private setNavPosition() {
    let navHeight = document.getElementsByTagName('app-top-bar')[0].children[0].clientHeight;
    document.querySelector("body").style.cssText = `--nav-ht: ${navHeight}px`;
  }
  onResize(event) {
    if(this.web) {
      this.setNavPosition();
    }
  }
  toggleSB() {
    if (this.sbOpen) {
      this.closeSB()
    } else {
      this.openSB()
    }
    this.sbOpen = !this.sbOpen;
  }
  openSB() {
    
    document.getElementById("mySidebar").style.left = "0";
    document.getElementById("mySidebar").style.boxShadow = "16px 0px 160px #000000";
  }
  closeSB() {
    document.getElementById("mySidebar").style.left = "-320px";
    document.getElementById("mySidebar").style.boxShadow = "none";
    if (this.editableSubs) {
      setTimeout(() => {
        this.cancelSubEdit();
      }, 1000)
    }
  }
  filterFeed() {
    let dateFrom = (new Date(this.dateFrom.nativeElement.value)).getTime();
    let dateTill = (new Date(this.dateTill.nativeElement.value)).getTime();
    this.filteredFeed = JSON.parse(JSON.stringify(this.feed));
      if(dateFrom || dateTill || this.subsFilter) {
      this.filteredFeed.forEach(section => {
        section.notices = section.notices.filter(n => {
          let nDate = (new Date(n.display_date)).getTime();
          let out = true;
          out = dateFrom ? dateFrom <= nDate: out;
          out = dateTill ? out && (dateTill >= nDate): out;
          out = (this.subsFilter.length > 0) ? out && this.subsFilter.includes(n.grouping_id): out;
          return out;
        });
      });
      this.filteredFeed = this.filteredFeed.filter(section => section.notices.length !== 0);
    }
  }
  clearFilters() {
    this.dateFrom.nativeElement.value = "";
    this.dateTill.nativeElement.value = "";
    this.subsFilter = [];
    this.filterFeed();
  }
  editSubs() {
    this.editableSubs = true;
  }
  saveSubs() {
    this.editableSubs = false;
    if (this.subsToAdd.length > 0) {
      this.noticeService.addSubs(this.userID, this.subsToAdd.toString()).subscribe();
    }
    if (this.subsToRemove.length > 0) {
      this.noticeService.removeSubs(this.userID, this.subsToRemove.toString()).subscribe();
    }
    location.reload(); 
  }

  updateUnsub(e: MatCheckboxChange, id: number) {
    if (!e.checked) {
      this.subsToRemove.push(id);
    } else {
      this.subsToRemove = this.subsToRemove.filter(i => i != id);
    }
  }
  updateSub(e: MatCheckboxChange, id: number) {
    if (e.checked) {
      this.subsToAdd.push(id);
    } else {
      this.subsToAdd = this.subsToAdd.filter(i => i != id);
    }
  }
  cancelSubEdit() {
    this.editableSubs = false;
    this.subsToAdd = [];
    this.subsToRemove = [];
  }

}
