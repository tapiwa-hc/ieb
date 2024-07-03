import { Component, Input, OnInit } from '@angular/core';
import { FeedNotice } from '../interfaces/Notices';

@Component({
  selector: '[app-feed-item]',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.css'],
})
export class FeedItemComponent implements OnInit {
  focused: boolean = false;
  showEllipsis = true;
  collapsed = false;

  @Input() notices: FeedNotice[];
  @Input() sectionName: string;

  constructor() {}

  ngOnInit(): void {}

  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }
}
