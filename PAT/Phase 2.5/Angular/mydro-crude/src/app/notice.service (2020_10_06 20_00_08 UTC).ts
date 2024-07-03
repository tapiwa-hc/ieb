import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { PendingNotice } from './interfaces/PendingNotice';
import { AllNotice } from './interfaces/All';
import { GroupList, NewGroup } from './interfaces/NoticeGroup';
import { SectionInfo } from './interfaces/Section' ;
import { Student } from './interfaces/Users';
import { printList } from './interfaces/pdf';
import { Feed, Subs } from './interfaces/Feed';
import { NewNotice } from './interfaces/New';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class NoticeService {
  private dbUrl = 'http://localhost:3000/api';
  private _sections: SectionInfo[];
  private _students: Student[];

  getPending(): Observable<PendingNotice[]> {
    return this.http.get<PendingNotice[]>(`${this.dbUrl}/pending`).pipe(
      catchError(this.handleError<PendingNotice[]>('getPending', []))
    );
  }
  updatePendingStatus(id: number, status: number) {
    return this.http.put(`${this.dbUrl}/pending`, { "id": id, "status": status }).pipe(
      catchError(this.handleError<any>('updatePendingStatus'))
    )
    // Delete or hide?
  }

  // Groups
  getGroups(): Observable<GroupList[]> {
    return this.http.get<GroupList[]>(`${this.dbUrl}/groups`).pipe(
      catchError(this.handleError<GroupList[]>('getGroups', []))
    );
  }

  editGroupName(id: number, name: string) {
    return this.http.put(`${this.dbUrl}/groups`,{ "id": id, "name": name } ).pipe(
      catchError(this.handleError<any>('editGroupName'))
    );
  }

  deleteGroup(id: number, recursive: boolean) {
    return this.http.delete(`${this.dbUrl}/groups/${id}/${recursive}`).pipe(
      catchError( this.handleError<any>('deleteGroup'))
    );
  }

  addGroup(group: NewGroup) {
    return this.http.post(`${this.dbUrl}/groups`, group).pipe(
      catchError(this.handleError<any>('addGroup'))
    );
  }
  // Sections
  
  getSections(): Observable<SectionInfo[]> {
    if (!this._sections) {
      return this.http.get<SectionInfo[]>(`${this.dbUrl}/sections`).pipe(
        catchError(this.handleError<SectionInfo[]>('getSections', [])),
        tap(res => this._sections = res)
      );
    } else {
      return of(this._sections);
    }
  }

  editNotice(id: number, title: string, description: string) {
    return this.http.put(`${this.dbUrl}/edit`, { "id": id, "title": title, "description": description }).pipe(
      catchError(this.handleError<any>('editNotice'))
    );
  }

  // New
  getStudents(): Observable<Student[]> {
    if (!this._students) {
      return this.http.get<Student[]>(`${this.dbUrl}/students`).pipe(
        catchError(this.handleError<Student[]>('getStudents', []))
      );
    } else {
      return of(this._students);
    }
  }

  newNotice(n: NewNotice) {
    return this.http.post(`${this.dbUrl}/new`, n).pipe(
      catchError(this.handleError<any>('newNotice'))
    );
  }

  // Export
  exportToPDF(date, sections): Observable<printList[]> {
    // console.log(`${this.dbUrl}/export/${date}/${sections}`);
    return this.http.get<printList[]>(`${this.dbUrl}/export/${date}/${sections}`).pipe(
      catchError(this.handleError<printList[]>('exportToPDF', []))
    );
  }

  // Feed
  getMyNotices(id): Observable<Feed[]> {
    return this.http.get<Feed[]>(`${this.dbUrl}/feed/${id}`).pipe(
      catchError(this.handleError<Feed[]>('getMyNotices', []))
    );
  }

  getSubs(id): Observable<Subs[]> {
    return this.http.get<Subs[]>(`${this.dbUrl}/subs/${id}`).pipe(
      catchError(this.handleError<Subs[]>('getSubs', []))
    );
  }

  addSubs(id, add) {
    return this.http.post(`${this.dbUrl}/subs/${id}/${add}`, {}).pipe(
      catchError(this.handleError<any>('addSubs'))
    );
  }
  removeSubs(id, remove) {
    return this.http.delete(`${this.dbUrl}/subs/${id}/${remove}`, {}).pipe(
      catchError(this.handleError<any>('removeSubs'))
    );
  }

  // All
  getAll(): Observable<AllNotice[]> {
    return this.http.get<AllNotice[]>(`${this.dbUrl}/all`).pipe(
      catchError(this.handleError<AllNotice[]>('getAll', []))
    );
  }
  constructor(private http: HttpClient,
    private router: Router) { }
  
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error['error']['errno'] === 1451) {
        throw error;
      } 
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          this.router.navigate(['/login'])
        }
      }
      
      console.error(error);
      return of(result as T);
    }
  }
}
