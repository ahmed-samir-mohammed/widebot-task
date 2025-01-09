import { Component, inject } from '@angular/core';
import { DashboardService } from '../../../core/services/dashboard.service';
import { UsersService } from '../../../core/services/users.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
@Component({
  selector: 'app-dashboard',
  imports: [NgxChartsModule],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div class="bg-slate-800 rounded-lg shadow p-4">
        <h2 class="text-lg font-semibold mb-2">User Distribution</h2>
        <ngx-charts-pie-chart
          [results]="userRoleData"
          [view]="[400, 300]"
          [legend]="true"
          [doughnut]="true"
        ></ngx-charts-pie-chart>
      </div>
    </div>
  `,
  styles: [],
})
export class DashboardComponent {
  dashboardService = inject(DashboardService);
  usersService = inject(UsersService);
  recentActivities: any;
  adminCount!: number;
  totalUsers!: number;
  userCount!: number;
  userRoleData!: { name: string; value: number }[];

  ngOnInit() {
    this.dashboardService.getTotalUsers().subscribe();
    this.usersService.users$.subscribe((users) => {
      this.totalUsers = users.length;
      this.adminCount = users.filter((user) => user.role === 1).length;
      this.userCount = users.filter((user) => user.role === 2).length;
      this.userRoleData = [
        { name: 'Admins', value: this.adminCount },
        { name: 'Users', value: this.userCount },
      ];
    });
  }
}
