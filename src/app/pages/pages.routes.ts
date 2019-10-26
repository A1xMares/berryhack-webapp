import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";

const pagesRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
    data: {
      title: 'Profile',
      orangeLine: 0
    }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      title: 'Dashboard',
      orangeLine: 0
    }
  },
  {
    path: 'otro',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
