import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { GroupList, NewGroup, NoticeGroup } from './interfaces/Groups';
import {
  AllNotice,
  Feed,
  NewNotice,
  PendingNotice,
  PrintList,
} from './interfaces/Notices';
import { SectionInfo } from './interfaces/Section';
import { Student } from './interfaces/Users';

@Injectable({
  providedIn: 'root',
})
export class NoticeService {
  private dbUrl = 'http://localhost:3000/api';
  private _sections: SectionInfo[];
  private _students: Student[];

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  /*
   * Unless specified otherwise, each of the methods below returns an RxJS Observable
   * of the results of a specified HTTP request to the dbURL above
   * for more detailed descriptions, please refer to the server js files
   */

  /*
   * @returns {Observable<PendingNotice[]>}
   */
  getPending(): Observable<PendingNotice[]> {
    return this.http
      .get<PendingNotice[]>(`${this.dbUrl}/pending`)
      .pipe(catchError(this.handleError<PendingNotice[]>('getPending', [])));
  }

  /*
   * @param {number} [id] id of the notice to update
   * @param {number} [status] status to set
   * @returns {Observable<any>}
   */
  updatePendingStatus(id: number, status: number) {
    return this.http
      .put(`${this.dbUrl}/pending`, { id: id, status: status })
      .pipe(catchError(this.handleError<any>('updatePendingStatus')));
  }

  // Groups

  /*
   * @returns {Observable<GroupList[]>}
   */
  getGroups(): Observable<GroupList[]> {
    return this.http
      .get<GroupList[]>(`${this.dbUrl}/groups`)
      .pipe(catchError(this.handleError<GroupList[]>('getGroups', [])));
  }

  /*
   * @param {number} [id] id of group to change
   * @param {string} [name] name to set
   * @returns {Observable<any>}
   */
  setGroupName(id: number, name: string) {
    return this.http
      .put(`${this.dbUrl}/groups`, { id: id, name: name })
      .pipe(catchError(this.handleError<any>('editGroupName')));
  }

  /*
   * @param {number} [id] id of group to delete
   * @param {boolean} [recursive] whether to remove all references to the group instead of a group itself
   * @returns {Observable<any>}
   */
  deleteGroup(id: number, recursive: boolean) {
    return this.http
      .delete(`${this.dbUrl}/groups/${id}/${recursive}`)
      .pipe(catchError(this.handleError<any>('deleteGroup')));
  }

  /*
   * @param {NewGroup} [group] object with group's name and section
   * @returns {Observable<any>}
   */
  addGroup(group: NewGroup) {
    return this.http
      .post(`${this.dbUrl}/groups`, group)
      .pipe(catchError(this.handleError<any>('addGroup')));
  }

  // Sections

  /*
   * @returns {Promise<SectionInfo[]>}
   */
  getSections(): Observable<SectionInfo[]> {
    if (!this._sections) {
      return this.http.get<SectionInfo[]>(`${this.dbUrl}/sections`).pipe(
        catchError(this.handleError<SectionInfo[]>('getSections', [])),
        tap((res) => (this._sections = res))
      );
    } else {
      return of(this._sections);
    }
  }

  // New

  /*
   * @returns {Promise<Student[]>}
   */
  getStudents(): Observable<Student[]> {
    if (!this._students) {
      return this.http
        .get<Student[]>(`${this.dbUrl}/students`)
        .pipe(catchError(this.handleError<Student[]>('getStudents', [])));
    } else {
      return of(this._students);
    }
  }

  /*
   * @param {NewNotice} [n] object with the notices's 
      userID, 
      display_date, 
      groupingID, 
      title, 
      description, and 
      optional tags
   * @returns {Observable<any>}
   */
  newNotice(n: NewNotice) {
    return this.http
      .post(`${this.dbUrl}/new`, n)
      .pipe(catchError(this.handleError<any>('newNotice')));
  }

  // Export

  /*
   * @param {any} [date] display_date by which to filter notices
   * @param {any} [sections] (array which will be parsed into) comma-separated ids of sections by which to filter notices
   * @returns {Promise<PrintList[]>}
   */
  exportToPDF(date: any, sections: any): Observable<PrintList[]> {
    return this.http
      .get<PrintList[]>(`${this.dbUrl}/export/${date}/${sections}`)
      .pipe(catchError(this.handleError<PrintList[]>('exportToPDF', [])));
  }

  // Feed

  /*
   * @param {number} [id] id of user whose feed to return
   * @returns {Promise<Feed[]>}
   */
  getMyNotices(id: number): Observable<Feed[]> {
    return this.http
      .get<Feed[]>(`${this.dbUrl}/feed/${id}`)
      .pipe(catchError(this.handleError<Feed[]>('getMyNotices', [])));
  }

  /*
   * @returns {Promise<Feed[]>}
   */
  getMyNoticesMobile(): Observable<Feed[]> {
    return this.http
      .get<Feed[]>(`${this.dbUrl}/mobile/feed`)
      .pipe(catchError(this.handleError<Feed[]>('getMyNoticesMobile', [])));
  }

  /*
   * @param {number} [id] id of user whose subscriptions to return
   * @returns {Promise<NoticeGroup[]>}
   */
  getSubs(id: number): Observable<NoticeGroup[]> {
    return this.http
      .get<NoticeGroup[]>(`${this.dbUrl}/subs/${id}`)
      .pipe(catchError(this.handleError<NoticeGroup[]>('getSubs', [])));
  }

  /*
   * @param {number} [id] id of user whose subscriptions to insert
   * @param {string} [add] comma-separated ids of groups to insert
   * @returns {Promise<any>}
   */
  addSubs(id: number, add: string) {
    return this.http
      .post(`${this.dbUrl}/subs/${id}/${add}`, {})
      .pipe(catchError(this.handleError<any>('addSubs')));
  }

  /*
   * @param {number} [id] id of user whose subscriptions to delete
   * @param {string} [remove] comma-separated ids of groups to delete
   * @returns {Promise<any>}
   */
  removeSubs(id: number, remove: string) {
    return this.http
      .delete(`${this.dbUrl}/subs/${id}/${remove}`, {})
      .pipe(catchError(this.handleError<any>('removeSubs')));
  }

  // All
  getAll(): Observable<AllNotice[]> {
    return this.http
      .get<AllNotice[]>(`${this.dbUrl}/all`)
      .pipe(catchError(this.handleError<AllNotice[]>('getAll', [])));
  }

  /*
   *
   */
  editNotice(id: number, title: string, description: string) {
    return this.http
      .put(`${this.dbUrl}/edit`, {
        id: id,
        title: title,
        description: description,
      })
      .pipe(catchError(this.handleError<any>('editNotice')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error['error']['errno'] === 1451) {
        throw error;
      }
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          this.snackBar.open(
            'You do not have access to this resource',
            undefined,
            {
              duration: 2000,
            }
          );
        }
      }

      console.error(error);
      return of(result as T);
    };
  }
}
