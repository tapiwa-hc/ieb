import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { PendingNotice } from './interfaces/PendingNotice';
import { GroupList, NewGroup } from './interfaces/NoticeGroup';
import { SectionInfo } from './interfaces/Section' ;
import { Student } from './interfaces/Users';
import { printList } from './interfaces/pdf';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {
  private dbUrl = 'http://localhost:3000/api';

  getPending(): Observable<PendingNotice[]> {
    return this.http.get<PendingNotice[]>(`${this.dbUrl}/pending`).pipe(
      catchError(this.handleError<PendingNotice[]>('getPending', []))
    );
  }
  updatePendingStatus(id: number, status: number) {
    return this.http.put(`${this.dbUrl}/pending`, { "id": id, "status": status }).pipe(
      catchError(this.handleError<any>('updatePendingStatus'))
    )
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
    return this.http.get<SectionInfo[]>(`${this.dbUrl}/sections`).pipe(
      catchError(this.handleError<SectionInfo[]>('getSections', []))
    );
  }


  editNotice(id: number, title: string, description: string) {
    return this.http.put(`${this.dbUrl}/edit`, { "id": id, "title": title, "description": description }).pipe(
      catchError(this.handleError<any>('editNotice'))
    );
  }

  // New
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.dbUrl}/students`).pipe(
      catchError(this.handleError<Student[]>('getStudents', []))
    );
  }

  // Export
  exportToPDF(date, sections): Observable<printList[]> {
    // console.log(`${this.dbUrl}/export/${date}/${sections}`);
    return this.http.get<printList[]>(`${this.dbUrl}/export/${date}/${sections}`).pipe(
      catchError(this.handleError<printList[]>('exportToPDF', []))
    );
  }
  constructor(private http: HttpClient) { }
  
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error['error']['errno'] === 1451) {
        throw error;
      }
      console.error(error);
      return of(result as T);
    }
  }
}