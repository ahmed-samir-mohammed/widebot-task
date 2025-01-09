import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { User } from '../interface/user';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated$ = new BehaviorSubject<boolean>(false);
  private user$ = new BehaviorSubject<User | null>(null);
  http = inject(HttpClient);
  toaster = inject(ToastrService);
  usersService = inject(UsersService)

  login(username: string, password: string): Observable<User> {
    return this.http.get<User[]>(`${environment.API_URL}/USERS`).pipe(
      tap((users: User[]) => this.usersService.setUserData(users)),
      map((users: User[]) => {
        const user = users.find(
          (user: User) =>
            user.username === username && user.password === password
        );
        if (!user) {
          const errorMessage = users.some(
            (user: User) => user.username === username
          )
            ? 'Password does not match'
            : 'Username does not match';
          this.toaster.error(errorMessage);
          throw new Error('Authentication failed');
        }
        this.isAuthenticated$.next(true);
        this.user$.next(user);
        return user;
      }),
      tap({
        error: () => this.toaster.error('Login failed'),
      })
    );
  }

  logout(): void {
    this.isAuthenticated$.next(false);
    this.user$.next(null);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated$.getValue();
  }

  isLoggedIn$() {
    return this.isAuthenticated$.asObservable();
  }

  getUser(): User | null {
    return this.user$.getValue();
  }
}
