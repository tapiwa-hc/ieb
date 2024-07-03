import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';

import { NoticeService } from '../notice.service';

import { Student } from '../interfaces/Users';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  removable: boolean = true;
  selectable: boolean = true;
  students: Student[];
  taggedStudents: Student[];

  constructor(private fb: FormBuilder,
    private noticeService: NoticeService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  private getStudents() {
    this.noticeService.getStudents().subscribe(res => {
      this.students = res;
      this.taggedStudents = res.slice(0,2);
    });
  }

  tag(event: MatChipInputEvent) {
    event.input.value = '';
  }
 
  untag(student: Student) {
    console.log('yee');
    this.taggedStudents = this.taggedStudents.filter(s => s.id !== student.id);
  }

}
