import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpRequest } from '@angular/common/http';

import { Subject } from "rxjs";

// Defined type
export interface Reservation {
  _id: String;
  member_id: String;
  passenger: String;
  date: String;
  time: String;
  vanline: String;
  pickup: String;
  destination: String;
  status: String;
  amount: Number;
  imagePath: String;
  price: Number;
}
export class Member {
  _id!: String;
  member_username!: String;
  member_password!: String;
  member_firstname!: String;
  member_lastname!: String;
  member_tel!: String;
  type!: String;
}
export class Admin {
  _id!: String;
  admin_username!: String;
  admin_password!: String;
  type!: String;
}
export class Contact {
  _id!: String;
  contact_member_id!: String;
  contact_member_name!: String;
  contact_member_email!: String;
  contact_member_tel!: Number;
  contact_massage!: String;
}

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  // Node/Express API
  REST_API: string = 'http://localhost:9999/api';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  private reservation: Reservation[] = [];
  private reservation$ = new Subject<Reservation[]>();

  constructor(private httpClient: HttpClient) {}

  // Add
  addReservation(data: Reservation, image: File): void {
    const formData = new FormData();
    formData.append('member_id', String(data.member_id));
    formData.append('passenger', String(data.passenger));
    formData.append('date', String(data.date));
    formData.append('time', String(data.time));
    formData.append('vanline', String(data.vanline));
    formData.append('pickup', String(data.pickup));
    formData.append('destination', String(data.destination));
    formData.append('status', String(data.status));
    formData.append('amount', String(data.amount));
    formData.append('price', String(data.price));
    formData.append('image', image);

    let API_URL = `${this.REST_API}/paid-page`;
    this.httpClient.post<{ reservaT: Reservation }>(API_URL, formData)
    .subscribe((formData) => {
      const reservation: Reservation = {
        _id: formData.reservaT._id,
        member_id: formData.reservaT.member_id,
        passenger: formData.reservaT.passenger,
        date: formData.reservaT.date,
        time: formData.reservaT.time,
        vanline: formData.reservaT.vanline,
        pickup: formData.reservaT.pickup,
        destination: formData.reservaT.destination,
        status: formData.reservaT.status,
        amount: formData.reservaT.amount,
        imagePath: formData.reservaT.imagePath,
        price: formData.reservaT.price
      };
      this.reservation.push(reservation);
      this.reservation$.next(this.reservation);
    });
  }
  addMember(data: Member): Observable<any> {
    let API_URL = `${this.REST_API}/signup-page`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      );
  }
  addContect(data: Contact): Observable<any> {
    let API_URL = `${this.REST_API}/contact-page`;
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
  getAdmins() {
    return this.httpClient.get(`${this.REST_API}/admins`);
  }
  getContacts() {
    return this.httpClient.get(`${this.REST_API}/contacts`);
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
  getAdmin(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/admins/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
      );
  }
  getContact(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/contacts/${id}`;
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
  updateAdmin(id: any, data: any): Observable<any> {
    let API_URL = `${this.REST_API}/update-admin/${id}`;
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
  deleteAdmin(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-admin/${id}`;
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