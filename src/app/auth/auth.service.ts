import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../shared/parameters';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  url = environment.url_api;
  // login(token: string): any {}

  logout(token: string): any {}
  headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
 
    
    Authorization: 'Bearer',
  };


  login( token: string): any{
    let url = `${this.url}/auth/login`;
    let body = {
      plataforma_id : 1
    }
    this.headers.Authorization = 'Bearer'+ ' '+token
    return this.http
      .post(url,body,{
        headers: this.headers,
      })
      .pipe(map((data) => data));
  }
}
