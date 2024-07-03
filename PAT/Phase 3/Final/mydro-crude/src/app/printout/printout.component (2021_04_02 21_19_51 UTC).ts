import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PrintList } from '../interfaces/Notices';
import { SectionInfo } from '../interfaces/Section';

@Component({
  selector: 'app-printout',
  templateUrl: './printout.component.html',
  styleUrls: ['./printout.component.css'],
})
export class PrintoutComponent implements OnInit {
  @Input() exportModel;
  @Input() dailyNotices: PrintList[];
  @Input() sectionInfo: SectionInfo[];

  constructor(private snackBar: MatSnackBar) {}

  // inform user that printout is ready
  ngOnInit(): void {
    let snackBarRef = this.snackBar.open('Ready for export!', 'PRINT TO PDF', {
      duration: 50000,
    });
    snackBarRef.afterDismissed().subscribe(() => {
      window.print();
    });
  }
}
