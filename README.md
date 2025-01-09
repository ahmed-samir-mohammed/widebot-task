# WidebotTask - Part 1

This project is a **User Management System** developed using **Angular 19**. It features authentication, user management (CRUD operations), role-based access control (RBAC), and a dashboard displaying statistics and recent activities.

---

## **Technologies Used**

- **Framework:** Angular 19
- **Styling:** Tailwind CSS
- **Charts:** ngx-charts (for interactive graphs)
- **Icons:** Angular Material Icons
- **API Management:** JSON Server (Mock API)
- **State Management:** Signals (Angular 16+ feature for state sharing)
- **Notifications:** ngx-toastr

---

## **Code Structure**

The project follows a modular architecture to ensure scalability and maintainability.

### **Directory Tree:**

```
src/
├── app/
│   ├── core/
│   │   ├── enum/
│   │   │   ├── role.ts
│   │   ├── guards/
│   │   │   ├── auth.guard.ts
│   │   │   ├── role.guard.ts
│   │   ├── interface/
│   │   │   ├── user.ts
│   │   ├── layout/
│   │   │   ├── layout.component.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── users.service.ts
│   │   │   ├── dashboard.service.ts
│   ├── shared/
│   │   ├── components/
│   │   │   ├── navbar/
│   │   │   │   ├── navbar.component.ts
│   │   │   ├── shared-dialog/
│   │   │   │   ├── shared-dialog.component.ts
│   │   │   ├── user-form/
│   │   │   │   ├── navbuser-formar.component.ts
│   ├── features/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   ├── login.component.ts
│   │   │   ├── unauthorized/
│   │   │   │   ├── unauthorized.component.ts
│   │   ├── user/
│   │   │   ├── profile/
│   │   │   │   ├── profile.component.ts
│   │   │   └── user.routes.ts
│   │   ├── admin/
│   │   │   ├── dashboard/
│   │   │   │   ├── dashboard.component.ts
│   │   │   ├── user-list/
│   │   │   │   ├── add-user-dialog/
│   │   │   │   │   ├── add-user-dialog.component.ts
│   │   │   │   ├── add-user-modal/
│   │   │   │   │   ├── add-user-modal.component.ts
│   │   │   │   ├── tabel/
│   │   │   │   │   ├── tabel.component.ts
│   │   │   │   ├── user-list.component.ts
│   │   │   └── admin.routes.ts
│   ├── app.component.ts
│   └── app.routes.ts
└── assets/
```

---

## **Development server**

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

---

## **JSON Server**

This project uses a JSON Server as a mock API. To start the server, run:

1. Install JSON Server globally (if not already installed):
   ```bash
   npm install -g json-server
   ```
2. Start the server:

   ```bash
   json-server --watch db.json --port 3000
   ```

   Replace `db.json` with the path to your JSON data file.

3. Open your browser and navigate to `http://localhost:3000/` to access the API.

---

## **Code scaffolding**

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

---

## **Building**

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

---

## **Running unit tests**

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

---

## **Running end-to-end tests**

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

---

## **Additional Resources**

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

---
---

# WidebotTask - Part 2

# **Code Review Report**

### **Identified Issues and Solutions**

**State Management:**

- **Issue:** `dashboardSubject` in `dashboard.service.ts` is used inefficiently for state management, leading to code duplication and potential inconsistencies.
- **Solution:** Implement NgRx or Akita for centralized state management. Separate state logic from components and use selectors for state access.

**Memory Leaks:**

- **Issue:** Subscriptions in `dashboard.component.ts` and `widget.component.ts` are not properly unsubscribed, risking memory leaks.
- **Solution:** Use `takeUntil` with a dedicated `Subject` for cleanup or replace manual subscriptions with `AsyncPipe` in templates.

**Code Duplication:**

- **Issue:** Repeated logic for fetching and refreshing widgets is present in multiple components (`dashboard.component.ts` and `widget.component.ts`).
- **Solution:** Consolidate the logic into reusable methods in a shared service or utility class.

**Error Handling:**

- **Issue:** Minimal or missing error handling for API calls, leading to poor user experience during failures.
- **Solution:** Use RxJS `catchError` operator to gracefully handle errors and provide user-friendly messages. Introduce a global error handler service.

**Unclear Variable Names:**

- **Issue:** Ambiguous names like `dashboardSubject` and `data` reduce readability.
- **Solution:** Use descriptive names like `dashboardState$` and `widgetConfig$` to clearly indicate purpose.

**Loading State Management:**

- **Issue:** `loading` variable in `dashboard.component.ts` is not effectively synchronized with API operations.
- **Solution:** Use `finalize` operator in RxJS pipelines to manage loading state transitions.

**Documentation:**

- **Issue:** Functions and components lack comments explaining their purpose and usage, reducing maintainability.
- **Solution:** Add clear comments and JSDoc annotations for functions and classes.
