import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';

import { catchError, delay, Observable } from 'rxjs';
import { updateUserRequest, User } from '../../model/entities.model';



@Injectable({
  providedIn:'root'
})
export class UserService {

  private apiUrl: string = 'http://localhost:9299/api/v1/users';

  constructor(private http: HttpClient) { }

  setHeadersToken() {
    const token = localStorage.getItem('token')
    const headers = { 'Authorization': `Bearer ${token}` }
    return headers
  }

  fetchUser(email: string): Observable<User> {
    const headers = this.setHeadersToken()
    return this.http.get<User>(`${this.apiUrl}/`+email+`/user`, {responseType: 'json', headers})
  }

  updateUser(request: updateUserRequest | undefined, id: number): Observable<User> {
    const headers = this.setHeadersToken()
    return this.http.put<User>(`${this.apiUrl}/`+id+`/update`, request, {responseType: 'json', headers}).pipe(delay(3000))
  }

  deleteUser(id: number): Observable<String> {
    const headers = this.setHeadersToken()
    return this.http.delete<String>(`${this.apiUrl}/`+id+`/delete`, {headers}).pipe(delay(2000))
  }

}
