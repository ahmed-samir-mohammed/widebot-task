import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated$ = new BehaviorSubject<boolean>(false);
  private userRole$ = new BehaviorSubject<string | null>(null);
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User> {
    return this.http.get<User>(`${environment.API_URL}/USERS`).pipe(
      tap((user) => {
        user.username === username
          ? this.isAuthenticated$.next(true)
          : this.isAuthenticated$.next(false);
        user.password === password
          ? this.isAuthenticated$.next(true)
          : this.isAuthenticated$.next(false);
      })
    );
  }

  logout(): void {
    this.isAuthenticated$.next(false);
    this.userRole$.next(null);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated$.getValue();
  }

  getUserRole(): string | null {
    return this.userRole$.getValue();
  }

  isLoggedIn$() {
    return this.isAuthenticated$.asObservable();
  }

  getUserRole$() {
    return this.userRole$.asObservable();
  }
}
