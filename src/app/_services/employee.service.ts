import { Employee } from './../Models/Employee';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiURL = "http://localhost:3000";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getUserBoard(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/employee', { responseType: 'text' });
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/employee')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  create(employee:Employee): Observable<any> {
    return this.httpClient.post(this.apiURL + '/employee/', JSON.stringify(employee), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  find(id:number): Observable<any> {
    return this.httpClient.get(this.apiURL + '/employee/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id:number, employee:Employee): Observable<any> {
    return this.httpClient.put(this.apiURL + '/employee/' + id, JSON.stringify(employee), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id:number){
    return this.httpClient.delete(this.apiURL + '/employee/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getDataBySalary(min: any, max: any): Observable<any>{
    return this.httpClient.get(this.apiURL + '/employee' + "?basic_salary=" + min + "&basic_salary=" + max);
  }

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }

}
