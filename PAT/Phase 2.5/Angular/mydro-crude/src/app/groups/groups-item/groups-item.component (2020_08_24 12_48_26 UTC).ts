import { Component, OnInit, Input } from '@angular/core';

import { NoticeGroup } from 'src/app/interfaces/NoticeGroup';
import { NoticeService } from 'src/app/notice.service';

@Component({
  selector: '[app-groups-item]',
  templateUrl: './groups-item.component.html',
  styleUrls: ['./groups-item.component.css']
})
export class GroupsItemComponent implements OnInit {
  @Input() group: NoticeGroup;

  editable: boolean = false;

  toggleEdits() : void {
    this.editable = !this.editable;
  }
  
  saveEdits(): void {
    this.toggleEdits();
    this.noticeService.editGroupName(this.group.id, this.group.name.trim()).subscribe();
    console.log(`saving group_id(${this.group.id}), name(${this.group.name})`);
  }

  delete(): void {
    this.noticeService.deleteGroup(this.group.id, false).subscribe(
      () => { 
        // TODO: Emit deletion event
      },
      err => {
        let errorNum = err['error']['errno'];
        if (errorNum === 1451) {
          if (confirm("WARNING: There are still notices in this group.\nThese will be lost")) {
            this.noticeService.deleteGroup(this.group.id, true).subscribe(
              () => { 
                // TODO: Emit deletion event
              }
            );
          }
        }
      })
    
  }

  constructor(private noticeService: NoticeService) { }

  ngOnInit(): void {
  }

}