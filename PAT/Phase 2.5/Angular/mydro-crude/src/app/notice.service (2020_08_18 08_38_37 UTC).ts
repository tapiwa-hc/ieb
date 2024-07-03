import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { PendingNotice } from './interfaces/PendingNotice';
import { Section } from './interfaces/NoticeGroup';
import { SectionInfo } from './interfaces/Section' ;

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
  getGroups(): Observable<Section[]> {
    return this.http.get<Section[]>(`${this.dbUrl}/groups`).pipe(
      catchError(this.handleError<Section[]>('getGroups', []))
    );
  }

  // Sections
  getSections(): Observable<SectionInfo[]> {
    return this.http.get<SectionInfo[]>(`${this.dbUrl}/sections`).pipe(
      catchError(this.handleError<SectionInfo[]>('getSections', []))
    );
  }


  editNotice(id: number, title: string, description: string) {
    return this.http.patch(`${this.dbUrl}/edit`, { "id": id, "title": title, "description": description }).pipe(
      catchError(this.handleError<any>('editNotice'))
    )
  }

  constructor(private http: HttpClient) { }
  
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
