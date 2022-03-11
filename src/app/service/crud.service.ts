import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

// Defined type
export class Reservation {
  _id!: String;
  member_id!: String;
  passenger!: String;
  date!: String;
  time!: String;
  vanline!: String;
  pickup!: String;
  destination!: String;
  status!: String;
  amount!: Number;
}
export class Member {
  _id!: String;
  member_username!: String;
  member_password!: String;
  member_firstname!: String;
  member_lastname!: String;
  member_tel!: String;
  member_type!: String;
}

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  // Node/Express API
  REST_API: string = 'http://localhost:9999/api';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {}

  // Add
  addReservation(data: Reservation): Observable<any> {
    let API_URL = `${this.REST_API}/homepage`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      );
  }
  addMember(data: Member): Observable<any> {
    let API_URL = `${this.REST_API}/signup-page`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get all objects
  getReservations() {
    return this.httpClient.get(`${this.REST_API}/reservations`);
  }
  getMembers() {
    return this.httpClient.get(`${this.REST_API}/members`);
  }

  // Get single object
  getReservation(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/reservations/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
      );
  }
  getMember(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/members/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
      );
  }

  // Update
  updateReservation(id: any, data: any): Observable<any> {
    let API_URL = `${this.REST_API}/update-reservation/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      );
  }
  updateMember(id: any, data: any): Observable<any> {
    let API_URL = `${this.REST_API}/update-member/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Delete
  deleteReservation(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-reservation/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      );
  }
  deleteMember(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-member/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error handle
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}