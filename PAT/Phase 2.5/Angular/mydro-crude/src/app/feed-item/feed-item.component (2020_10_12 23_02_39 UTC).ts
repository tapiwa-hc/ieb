import { Component, Input, OnInit } from '@angular/core';
import { FeedNotice } from '../interfaces/Notices';

@Component({
  selector: '[app-feed-item]',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.css']
})
export class FeedItemComponent implements OnInit {

  focused: boolean = false;
  showEllipsis = true;
  collapsed = false;

  // @Input() notice: FeedNotice;
  @Input() notices: FeedNotice[];
  @Input() sectionName: string;

  constructor() { }

  ngOnInit(): void {
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  // toggle() {
  //   if (this.focused) {
  //     document.getElementById(this.notice.id + '').style.transform = "rotate(0deg)"
  //   } else {
  //     document.getElementById(this.notice.id + '').style.transform = "rotate(-180deg)"
  //   }
  //   this.focused = !this.focused;
    
  // }
}
