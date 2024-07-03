import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NoticeGroup } from 'src/app/interfaces/NoticeGroup';

@Component({
  selector: 'app-r-groups-item',
  templateUrl: './r-groups-item.component.html',
  styleUrls: ['./r-groups-item.component.css']
})
export class RGroupsItemComponent implements OnInit {
  @Input() group: NoticeGroup;

  name = new FormControl(this.group.name);

  constructor() { }

  ngOnInit(): void {
  }

}
