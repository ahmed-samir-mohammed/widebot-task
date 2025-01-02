import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { User } from '../interface/user';
import { ToastrService } from 'ngx-toastr';
import { Role } from '../enum/role';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated$ = new BehaviorSubject<boolean>(false);
  private userRole$ = new BehaviorSubject<number | null>(null);
  http = inject(HttpClient);
  toaster = inject(ToastrService);

  login(username: string, password: string): Observable<User> {
    return this.http.get<User[]>(`${environment.API_URL}/USERS`).pipe(
      map((users: User[]) => {
        const user = users.find(
          (user: User) =>
            user.username === username && user.password === password
        );
        if (!user) {
          const errorMessage = users.some((user: User) => user.username === username)
            ? 'Password does not match'
            : 'Username does not match';
          this.toaster.error(errorMessage);
          throw new Error('Authentication failed');
        }
        this.isAuthenticated$.next(true);
        this.userRole$.next(user.role); // Assuming user has a role property
        return user;
      }),
      tap({
        error: (err) => {
          console.error('Login error:', err);
        },
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

  getUserRole(): number | null {
    return this.userRole$.getValue();
  }

  // isLoggedIn$() {
  //   return this.isAuthenticated$.asObservable();
  // }

  // getUserRole$() {
  //   return this.userRole$.asObservable();
  // }
}
