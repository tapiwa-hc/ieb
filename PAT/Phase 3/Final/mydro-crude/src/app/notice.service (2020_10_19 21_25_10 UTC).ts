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
  private _dbUrl = 'http://localhost:3000/api';
  private _sections: SectionInfo[];
  private _students: Student[];

  /*
   * @params {@Injectable} Dependencies to inject
   */
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
      .get<PendingNotice[]>(`${this._dbUrl}/pending`)
      .pipe(catchError(this.handleError<PendingNotice[]>('getPending', [])));
  }

  /*
   * @param {number} [id] id of the notice to update
   * @param {number} [status] status to set
   * @returns {Observable<any>}
   */
  updatePendingStatus(id: number, status: number) {
    return this.http
      .put(`${this._dbUrl}/pending`, { id: id, status: status })
      .pipe(catchError(this.handleError<any>('updatePendingStatus')));
  }

  // Groups

  /*
   * @returns {Observable<GroupList[]>}
   */
  getGroups(): Observable<GroupList[]> {
    return this.http
      .get<GroupList[]>(`${this._dbUrl}/groups`)
      .pipe(catchError(this.handleError<GroupList[]>('getGroups', [])));
  }

  /*
   * @param {number} [id] id of group to change
   * @param {string} [name] name to set
   * @returns {Observable<any>}
   */
  setGroupName(id: number, name: string) {
    return this.http
      .put(`${this._dbUrl}/groups`, { id: id, name: name })
      .pipe(catchError(this.handleError<any>('editGroupName')));
  }

  /*
   * @param {number} [id] id of group to delete
   * @param {boolean} [recursive] whether to remove all references to the group instead of a group itself
   * @returns {Observable<any>}
   */
  deleteGroup(id: number, recursive: boolean) {
    return this.http
      .delete(`${this._dbUrl}/groups/${id}/${recursive}`)
      .pipe(catchError(this.handleError<any>('deleteGroup')));
  }

  /*
   * @param {NewGroup} [group] object with group's name and section
   * @returns {Observable<any>}
   */
  addGroup(group: NewGroup) {
    return this.http
      .post(`${this._dbUrl}/groups`, group)
      .pipe(catchError(this.handleError<any>('addGroup')));
  }

  // Sections

  /*
   * @returns {Observable<SectionInfo[]>}
   */
  getSections(): Observable<SectionInfo[]> {
    if (!this._sections) {
      return this.http.get<SectionInfo[]>(`${this._dbUrl}/sections`).pipe(
        catchError(this.handleError<SectionInfo[]>('getSections', [])),
        tap((res) => (this._sections = res))
      );
    } else {
      return of(this._sections);
    }
  }

  // New

  /*
   * @returns {Observable<Student[]>}
   */
  getStudents(): Observable<Student[]> {
    if (!this._students) {
      return this.http
        .get<Student[]>(`${this._dbUrl}/students`)
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
      .post(`${this._dbUrl}/new`, n)
      .pipe(catchError(this.handleError<any>('newNotice')));
  }

  // Export

  /*
   * @param {any} [date] display_date by which to filter notices
   * @param {any} [sections] (array which will be parsed into) comma-separated ids of sections by which to filter notices
   * @returns {Observable<PrintList[]>}
   */
  exportToPDF(date: any, sections: any): Observable<PrintList[]> {
    return this.http
      .get<PrintList[]>(`${this._dbUrl}/export/${date}/${sections}`)
      .pipe(catchError(this.handleError<PrintList[]>('exportToPDF', [])));
  }

  // Feed

  /*
   * @param {number} [id] id of user whose feed to return
   * @returns {Observable<Feed[]>}
   */
  getMyNotices(id: number): Observable<Feed[]> {
    return this.http
      .get<Feed[]>(`${this._dbUrl}/feed/${id}`)
      .pipe(catchError(this.handleError<Feed[]>('getMyNotices', [])));
  }

  /*
   * @returns {Observable<Feed[]>}
   */
  getMyNoticesMobile(): Observable<Feed[]> {
    return this.http
      .get<Feed[]>(`${this._dbUrl}/mobile/feed`)
      .pipe(catchError(this.handleError<Feed[]>('getMyNoticesMobile', [])));
  }

  /*
   * @param {number} [id] id of user whose subscriptions to return
   * @returns {Observable<NoticeGroup[]>}
   */
  getSubs(id: number): Observable<NoticeGroup[]> {
    return this.http
      .get<NoticeGroup[]>(`${this._dbUrl}/subs/${id}`)
      .pipe(catchError(this.handleError<NoticeGroup[]>('getSubs', [])));
  }

  /*
   * @param {number} [id] id of user whose subscriptions to insert
   * @param {string} [add] comma-separated ids of groups to insert
   * @returns {Observable<any>}
   */
  addSubs(id: number, add: string) {
    return this.http
      .post(`${this._dbUrl}/subs/${id}/${add}`, {})
      .pipe(catchError(this.handleError<any>('addSubs')));
  }

  /*
   * @param {number} [id] id of user whose subscriptions to delete
   * @param {string} [remove] comma-separated ids of groups to delete
   * @returns {Observable<any>}
   */
  removeSubs(id: number, remove: string) {
    return this.http
      .delete(`${this._dbUrl}/subs/${id}/${remove}`, {})
      .pipe(catchError(this.handleError<any>('removeSubs')));
  }

  // All

  /*
   * @returns {Observable<AllNotice[]>}
   */
  getAll(): Observable<AllNotice[]> {
    return this.http
      .get<AllNotice[]>(`${this._dbUrl}/all`)
      .pipe(catchError(this.handleError<AllNotice[]>('getAll', [])));
  }

  /*
   * @param {number} [id] id of notice to edit
   * @param {string} [title] title to set
   * @param {string} [description] description to set
   * @returns {Observable<any>}
   */
  editNotice(id: number, title: string, description: string) {
    return this.http
      .put(`${this._dbUrl}/edit`, {
        id: id,
        title: title,
        description: description,
      })
      .pipe(catchError(this.handleError<any>('editNotice')));
  }

  /*
   * Returns an empty observable of the specified type upon an error of an HTTP request. 
      This is to prevent the application from crashing after such an error
   * @type [T] type of empty Observable to return
   * @param {string} [operation] name of the operation which failed
   * @param {T} [result] empty Observable to return
   * @returns {Observable<T>}
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //MySQL Foreign Key Constraint/Referential integrity error -- handled elsewhere
      if (error['error']['errno'] === 1451) {
        throw error;
      }

      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          // Unauthorised access to API route
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
