![Widebot-logo](https://i0.wp.com/widebot.net/wp-content/uploads/2024/03/Both-Vertical.png){width=200}


---

# Part1: Advanced User Management System Task

**Introduction**

As a **Frontend Dev**, you are tasked with creating an Angular application that simulates an advanced user management system with two roles: admin and user. This application will not only test your Angular skills but also your ability to make architectural decisions, optimize performance, and demonstrate leadership qualities.

## Features and Requirements

### 1. Authentication and Authorization and Secure static Login:
- Implement a static login page with two predefined sets of credentials, one for an admin and one for a user with username and password. 

### 2. Role-Based Access Control (RBAC)

- **Admin View (If logged in as an admin):**
  - Display a paginated and searchable list of all users with their details.
  - Include advanced CRUD operations:
    - **Add User:** Use reactive forms with validations.
    - **Edit User:** Pre-fill form with existing data; implement optimistic UI updates.
    - **Delete User:** Confirmation prompts with the option to undo (use a snackbar or toast).
  - **Impersonate User:** Admins can switch to a user’s view without logging out.
  - **Analytics Dashboard:** Show charts/graphs representing user data (e.g., number of regestered users, nubmer of users that have a spasific info ).

- **User View (If logged in as a user or if an admin chooses to view as a user):**
  - **Profile Management:**
    - View and edit profile details.

### 3. Advanced Navigation and Routing

### 4. State Management

### 5. Localization and Internationalization

### 6. Performance Optimization

### 7. Error Handling and Logging

### 8. Responsive Design

### 9. Testing (Optional)

### 10. Code Quality and Documentation

### 11. Leadership and Architectural Considerations

- **Architectural Decisions:**
  - Provide a brief document explaining your architectural choices and how they benefit the application's scalability and maintainability.
- **Code Reviews:**
  - Simulate a code review by identifying potential improvements in your own code.
- **Mentorship:**
  - Include comments or documentation that would help junior developers understand complex parts of the code.
- **Design Patterns:**
  - Implement design patterns where appropriate.

## Evaluation Criteria

- **Architectural Skills:** Quality of architectural decisions and application structure.
- **Technical Proficiency:** Mastery of Angular and related technologies.
- **Code Quality:** Cleanliness, readability, and maintainability of the code.
- **Problem-Solving:** Ability to handle complex requirements and edge cases.
- **Performance Optimization:** Efficient use of resources and application responsiveness.
- **Testing Practices:** Thoroughness and effectiveness of tests. (optional)
- **Leadership Qualities:** Demonstrated ability to guide, document, and set standards for a development team.
- **Communication:** Clarity and professionalism in documentation and code comments.

## Task Submission

- **Repository:**
  - Push your code to a public GitHub repository.
  - Use meaningful commit messages that reflect the changes made.

- **Documentation:**
  - Include a comprehensive README file that covers:
    - Project setup instructions.
    - Overview of the application.
    - Architectural decisions and rationale.
    - How to run tests and view code coverage.
    - Any other relevant information.

- **Presentation (Optional but Encouraged):**
  - Prepare a short presentation or video walkthrough (5-10 minutes) explaining your application, key features, and architectural choices.

## Task Notes

- **API Usage:**
  - You can use JSONPlaceholder or create a mock API using tools like **json-server**.
  - If you choose to extend or modify the API, document the changes.

- **Time Management:**
  - It's understood that this is a comprehensive task. Focus on delivering high-quality code for the most critical parts rather than trying to cover everything superficially.
  - Prioritize features that best showcase your abilities.

- **Assumptions and Clarifications:**
  - Document any assumptions you make during the task.
  - Feel free to reach out if you need any clarifications.

---

# **Part 2: Advanced Code Review and Optimization**

As part of assessing your ability to lead and mentor, please perform a code review on the following Angular component and service files from a junior developer. The code represents a more complex scenario involving state management, advanced RxJS usage, and dynamic routing. Identify issues, suggest improvements, and refactor the code where necessary.

## **Instructions**

1. **Identify Issues:**
   - Review the provided code files and **list all problems, anti-patterns, and areas of improvement** you can find.

2. **Suggest Improvements:**
   - **Explain how you would fix each issue** and provide the reasoning behind your suggestions.

3. **Refactor:**
   - Provide **refactored versions** of the code with your improvements implemented.

4. **Documentation:**
   - Write a brief **report summarizing your findings** and the changes you made.

## **Evaluation Criteria**

- **Attention to Detail:** Ability to spot issues that may not be immediately obvious.
- **Best Practices:** Knowledge of Angular, TypeScript, RxJS, NgRx (or any state management library), and general programming best practices.
- **Communication:** Clarity in explaining the issues and solutions.
- **Mentorship:** Ability to provide constructive feedback and guide junior developers.
- **Technical Proficiency:** Quality and effectiveness of the refactored code.

## **Code Files**

The following code represents a **dynamic dashboard** component and its corresponding services in an analytics application. The component displays real-time data, allows users to customize widgets, and handles complex state management. Please review all files thoroughly.

---

### **File: `dashboard.component.ts`**

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { WidgetService } from '../services/widget.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  template: `
    <h2>User Dashboard</h2>
    <div *ngIf="loading">Loading dashboard...</div>
    <div *ngIf="error">{{ error }}</div>
    <div *ngFor="let widget of widgets">
      <app-widget [config]="widget.config"></app-widget>
    </div>
    <button (click)="addWidget()">Add Widget</button>
    <button (click)="refreshDashboard()">Refresh Dashboard</button>
  `,
  styles: []
})
export class DashboardComponent implements OnInit {
  widgets = [];
  loading = false;
  error = '';

  constructor(private dashboardService: DashboardService, private widgetService: WidgetService) {}

  ngOnInit() {
    this.loading = true;
    this.dashboardService.getDashboard().subscribe(
      data => {
        this.widgets = data.widgets;
        this.loading = false;
      }
    );
  }

  addWidget() {
    const newWidget = this.widgetService.createWidget();
    this.widgets.push(newWidget);
    this.dashboardService.updateDashboard({ widgets: this.widgets }).subscribe();
  }

  refreshDashboard() {
    this.dashboardService.getDashboard().subscribe(data => {
      this.widgets = data.widgets;
    });
  }

}
```

---

### **File: `dashboard.service.ts`**

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable()
export class DashboardService {
  dashboard = null;
  dashboardSubject = new Subject<any>();
  apiUrl = '/api/dashboard';

  constructor(private http: HttpClient) {}

  getDashboard() {
    if (this.dashboard) {
      setTimeout(() => {
        this.dashboardSubject.next(this.dashboard);
      }, 0);
    } else {
      this.http.get(this.apiUrl).subscribe(data => {
        this.dashboard = data;
        this.dashboardSubject.next(this.dashboard);
      });
    }
    return this.dashboardSubject.asObservable();
  }

  updateDashboard(dashboard) {
    this.dashboard = dashboard;
    return this.http.post(this.apiUrl, dashboard);
  }
}
```

---

### **File: `widget.service.ts`**

```typescript
import { Injectable } from '@angular/core';

@Injectable()
export class WidgetService {
  widgetCounter = 0;

  constructor() {}

  createWidget() {
    this.widgetCounter++;
    return {
      id: this.widgetCounter,
      config: {
        type: this.widgetCounter % 2 === 0 ? 'chart' : 'table',
        data: []
      }
    };
  }
}
```

---

### **File: `widget.component.ts`**

```typescript
import { Component, Input, OnInit } from '@angular/core';
import { WidgetDataService } from '../services/widget-data.service';

@Component({
  selector: 'app-widget',
  template: `
    <div class="widget">
      <h3>{{ config.type }} Widget</h3>
      <!-- Assume we have some charting library rendering here -->
      <chart [data]="data"></chart>
      <div *ngIf="!data">No data available</div>
      <button (click)="refreshData()">Refresh Data</button>
    </div>
  `,
  styles: [`.widget { border: 1px solid #ccc; padding: 10px; margin: 10px; }`]
})
export class WidgetComponent implements OnInit {
  @Input() config;
  data;

  constructor(private widgetDataService: WidgetDataService) {}

  ngOnInit() {
    this.widgetDataService.getData(this.config.type).subscribe(data => {
      this.data = data;
    });
  }

  refreshData() {
    this.widgetDataService.getData(this.config.type).subscribe(data => {
      this.data = data;
    });
  }
}
```

---

### **File: `widget-data.service.ts`**

```typescript
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable()
export class WidgetDataService {
  constructor() {}

  getData(type): Observable<any> {
    if (type === 'chart') {
      return of([Math.random(), Math.random(), Math.random()]);
    } else if (type === 'table') {
      return of([{ id: Math.random() }, { id: Math.random() }]);
    } else {
      return of(null);
    }
  }
}
```

---

### **Notes**

- The application uses multiple services and components to handle dynamic data and user interactions.
- The code includes state management, RxJS observables, and dynamic component rendering.
- Focus on both functional issues and code quality aspects.
- Assume that other parts of the application (e.g., routing, module declarations, external libraries) are correctly set up.

---

## **Deliverables**

1. **Code Review Report:**
   - A document listing all identified issues, suggested improvements, and explanations.

2. **Refactored Code:**
   - Updated versions of:
     - `dashboard.component.ts`
     - `dashboard.service.ts`
     - `widget.service.ts`
     - `widget.component.ts`
     - `widget-data.service.ts`
   - Implement your improvements in these files.

3. **Additional Suggestions:**
   - Any recommendations for further enhancements or best practices not directly related to the code (e.g., architectural changes, performance optimizations).

---

## **Additional Context**

This advanced codebase includes several complex scenarios:

- **State Management:**
  - The dashboard state is shared across components and services.
  - There is a need for efficient state updates and synchronization.

- **RxJS and Observables:**
  - Multiple subscriptions and Subjects are used.
  - Proper management of subscriptions is critical to avoid memory leaks.

- **Dynamic Component Interaction:**
  - Widgets are dynamically added and configured.
  - Components need to communicate effectively with services and each other.

- **Potential Issues to Consider:**
  - Inefficient state handling.
  - Improper use of RxJS patterns.
  - Memory leaks due to subscriptions.
  - Component reusability and encapsulation.
  - Code readability and maintainability.

---

## **Expectations**

- **Thorough Analysis:**
  - Demonstrate deep understanding by identifying both obvious and subtle issues.
  - Consider the broader implications of code choices on scalability and maintainability.

- **Clear Communication:**
  - Provide clear, concise explanations suitable for mentoring a junior developer.
  - Use examples where appropriate to illustrate your points.

- **Effective Refactoring:**
  - Apply best practices and design patterns to improve the code.
  - Ensure that the refactored code is functional and efficient.

- **Leadership Qualities:**
  - Show thought leadership in your suggestions, considering not just immediate fixes but long-term improvements.
  - Highlight opportunities for improving team practices or project architecture.

---

**If you have any questions or need further clarifications, please feel free to reach out. Good luck!**
