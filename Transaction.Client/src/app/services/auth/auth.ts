import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/users/user';
import { AuthResponse } from '../../models/auth/auth-response';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7185/api/Auth';
  private currentUserSubject = new BehaviorSubject<string | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    if (token)
      this.currentUserSubject.next('user');
  }

  login(credentials: User) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/Login`, credentials
    ).pipe(tap((response: AuthResponse) => {
      localStorage.setItem('token', response.token);
      this.currentUserSubject.next('user');
    }));
  }

  register(user: User) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/Register`, user)
      .pipe(tap((response: AuthResponse) => {
        localStorage.setItem('token', response.token);
        this.currentUserSubject.next('user');
      }));
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}