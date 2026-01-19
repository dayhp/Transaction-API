import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/users/user';
import { AuthResponse } from '../../models/auth/auth-response';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7185/api/Auth';
  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: User) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/Login`, credentials
    ).pipe(tap((response: AuthResponse) => {
      localStorage.setItem('token', response.token);
    }));
  }

  register(user: User) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/Register`, user)
    .pipe(tap((response: AuthResponse) => {
      localStorage.setItem('token', response.token);
    }));
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}