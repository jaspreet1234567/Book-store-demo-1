import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse } from 'src/app/modules/core/models/api-response.interface';
import { Book } from '../models/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  REST_API: string = 'http://localhost:8000/api';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private httpClient: HttpClient
  ) { }

  // Get all objects
  GetBooks(): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(`${this.REST_API}/books`);
  }

  // Add
  AddBook(data: Book): Observable<ApiResponse> {
    let API_URL = `${this.REST_API}/add-book`;
    return this.httpClient.post<ApiResponse>(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Get single object
  GetBook(id: any): Observable<ApiResponse> {
    let API_URL = `${this.REST_API}/read-book/${id}`;
    return this.httpClient.get<ApiResponse>(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
        return res || {}
      }),
        catchError(this.handleError)
      )
  }

  // Update
  updateBook(id: any, data: any): Observable<ApiResponse> {
    let API_URL = `${this.REST_API}/update-book/${id}`;
    return this.httpClient.put<ApiResponse>(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Delete
  deleteBook(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-book/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    )
  }

  // Error 
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
