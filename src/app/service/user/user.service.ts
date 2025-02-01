import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { catchError, delay, Observable } from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class UserService {

  private apiUrl: string = 'http://localhost:9299/api/v1/users';

  constructor(private http: HttpClient) { }

  fetchUser(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/`+email+`/user`, {responseType: 'json'})
  }



}
