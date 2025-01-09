import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  http = inject(HttpClient);
  
  getTotalUsers(): Observable<number> {
    return this.http
      .get<any[]>(`${environment.API_URL}/USERS`)
      .pipe(map((users) => users.length));
  }

  getUserRoleDistribution(): Observable<{ name: string; value: number }[]> {
    return this.http.get<any[]>(`${environment.API_URL}/USERS`).pipe(
      map((users) => {
        const adminCount = users.filter((user) => user.role === 1).length;
        const userCount = users.filter((user) => user.role === 2).length;
        return [
          { name: 'Admins', value: adminCount },
          { name: 'Users', value: userCount },
        ];
      })
    );
  }
}
