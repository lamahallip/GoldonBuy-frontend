import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginRequest, registerRequest } from '../../model/login-and-register.model';
import { delay, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = 'http://localhost:9299/api/v2/auth';
  

  constructor(private http: HttpClient) { }


  // register service configuration /////////////////////////////////////////////////////////////

  register(user: registerRequest | undefined): Observable<string> {
    return this.http.post(`${this.apiUrl}/register`, user, {responseType: 'text'}).pipe(delay(6000))
  }

  // Register service configuration end /////////////////////////////////////////////////////////////


  // Login service configuration /////////////////////////////////////////////////////////////

  login(loginRequest : loginRequest) {
    return this.http.post(`${this.apiUrl}/login`, loginRequest, {responseType:'text'}).pipe(
      delay(5000),
      tap((result: any) => {
        localStorage.setItem('token', result)
      }));
  }
  
  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean | null {

    const token = localStorage.getItem('token');

    if(token != null) {
      return true;
    }

    return null;
  }

  ///////////////////////////////////////////////////////////////////////////

  getParsedPayload(): any {
    const token = localStorage.getItem('token');
    if(token != null) {
      const payload = atob(token.split('.')[1])
      const parsedPayload = JSON.parse(payload)
      return parsedPayload
    }
    return null
  }

  getEmailFromParsedPayload(): string {
    const email: string = this.getParsedPayload().sub
    return email;
  }

  getTokenFromLocalStorage() {
    return localStorage.getItem('token')
  }



  
}
