import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {}

  setUserData(users: User[]) {
    this.usersSubject.next(users);
  }

  addUser(user: User): Observable<any> {
    return this.http.post<User>(`${environment.API_URL}/USERS`, user).pipe(
      tap((newUser) => {
        const updatedUsers = [...this.usersSubject.value, newUser];
        this.setUserData(updatedUsers);
      })
    );
  }

  getCurrentUser(userId: string | number): Observable<User> {
    return this.http.get<User>(`${environment.API_URL}/USERS/${userId}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.API_URL}/USERS`);
  }

  deleteUser(userId: string | number): Observable<User> {
    return this.http
      .delete<User>(`${environment.API_URL}/USERS/${userId}`)
      .pipe(
        tap(() => {
          const updatedUsers = this.usersSubject.value.filter(
            (user) => user.id !== userId
          );
          this.setUserData(updatedUsers);
        })
      );
  }

  updateUser(userId: string | number, data: User): Observable<User> {
    return this.http.put<User>(`${environment.API_URL}/USERS/${userId}`, data);
  }
}
