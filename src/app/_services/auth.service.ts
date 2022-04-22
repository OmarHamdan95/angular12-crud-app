import { Employee } from './../Models/Employee';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = "http://localhost:3000";
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  private readonly TOKEN_NAME = 'auth_token';
  user!: Employee;

  get token(): any {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  constructor(private http:HttpClient, private tokenStorage:TokenStorageService){
      const token = tokenStorage.getToken();
      this._isLoggedIn$.next(!!token);
  }

  getUsers(){
    return this.http.get(this.apiURL + '/employee');
  }
}
