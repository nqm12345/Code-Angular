import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Products } from './product';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Products[]> {
    return this.httpClient.get<Products[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getProductById(id: number): Observable<Products> {
    return this.httpClient.get<Products>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code
      errorMessage = `Mã trả về của máy chủ: ${error.status}, error message is: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
