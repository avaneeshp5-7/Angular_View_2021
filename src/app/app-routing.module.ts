import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { AdminDashboardComponent } from './views/admin/admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './views/admin/dashboard/dashboard.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }, 
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {
    path: '',
    component: AdminDashboardComponent,
    data: {
      title: 'Dashboard'
    },canActivate:[AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/admin/admin.module').then(m => m.AdminModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
