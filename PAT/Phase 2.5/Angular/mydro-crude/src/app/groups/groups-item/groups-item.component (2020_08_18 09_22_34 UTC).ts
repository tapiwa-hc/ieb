import { Component, OnInit, Input } from '@angular/core';
import { NoticeGroup } from 'src/app/interfaces/NoticeGroup';

@Component({
  selector: '[app-groups-item]',
  templateUrl: './groups-item.component.html',
  styleUrls: ['./groups-item.component.css']
})
export class GroupsItemComponent implements OnInit {
  @Input() group: NoticeGroup;


  constructor() { }

  ngOnInit(): void {
  }

}
